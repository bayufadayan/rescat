/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/*=============== COMPONENT ===============*/
import MediaPreview from "@/components/scan/details/media-preview";
import BottomForm from "@/components/scan/details/bottom-form";
import SideForm from "@/components/scan/details/side-form";

/*=============== UTILS AND TYPES ===============*/
import { useIsMobile } from "@/hooks/use-mobile";
import { dataURLtoBlob, getCsrfToken, postWithRetry, humanizeError } from "@/lib/helper/upload";
import { reverseGeocode } from "@/lib/helper/reverse-geocode";
import type { Coords, GeoStatus, Address } from "@/types/geo";
import type { CatApiResponse } from "@/types/scan";

/*=============== THIRD PARTY ===============*/
import { useRoute } from "ziggy-js";

/*=============== GLOBAL STATE ===============*/
type Phase = "idle" | "uploading" | "analyzing" | "success" | "fail";

/**
 * ScanDetails
 *
 * Main page for image analysis prevention.
 * Handles image upload, Flask API communication, and location data.
 */
export default function ScanDetails() {
    const route = useRoute();
    const isMobile = useIsMobile();

    const [open, setOpen] = useState(true);
    const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
    const [coords, setCoords] = useState<Coords | null>(null);
    const [addr, setAddr] = useState<Address | null>(null);
    const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
    const [phase, setPhase] = useState<Phase>("idle");
    const [errorMsg, setErrorMsg] = useState<string>("");

    /**
     * Retrieve user's current geolocation and resolve it into an address.
     * Updates coordinates, address, status, and timestamp.
     * Sets geoStatus to "error" if retrieval fails.
     */
    const askLocation = async () => {
        setGeoStatus("locating");
        setAddr(null);
        try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 12000,
                    maximumAge: 0,
                });
            });

            const c = { lat: pos.coords.latitude, lon: pos.coords.longitude };
            setCoords(c);

            const a = await reverseGeocode(c);
            setAddr(a);

            setGeoStatus("ready");
            setUpdatedAt(new Date());
        } catch (e) {
            console.error(e);
            setGeoStatus("error");
        }
    };

    /**
     * Reset geolocation data and status to initial state.
     */
    const clearLocation = () => {
        setCoords(null);
        setAddr(null);
        setUpdatedAt(null);
        setGeoStatus("idle");
    };

    /** Auto-fetch location when the component mounts. */
    useEffect(() => {
        askLocation();
    }, []);

    /**
     * Mount guard:
     * Ensures this page is accessed only when a pending image or result exists.
     * Redirects to the capture route if none found.
     */
    useEffect(() => {
        const hasImg = !!sessionStorage.getItem("scan:pendingImage");
        const hasResult = !!sessionStorage.getItem("scan:result");
        if (!hasImg && !hasResult) {
            window.location.href = route("scan.capture");
        }
    }, [route]);

    /**
     * Freeze analyze URL and timeout value to keep dependency references stable.
     */
    const analyzeUrl = useMemo(() => route("scan.analyze"), [route]);
    const timeoutMs = useMemo(
        () => Number((import.meta as any).env?.VITE_SCAN_TIMEOUT_MS ?? 5000),
        []
    );

    /**
     * Perform image analysis once.
     * Used for both auto-run (on mount) and manual retry.
     * Handles file size check, API request, and result caching.
     */
    const analyzeOnce = useCallback(async () => {
        try {
            const dataUrl = sessionStorage.getItem("scan:pendingImage");
            const meta = sessionStorage.getItem("scan:pendingMeta");
            if (!dataUrl || !meta) return;

            setPhase("uploading");
            const blob = dataURLtoBlob(dataUrl);

            if (blob.size > 512 * 1024) {
                setPhase("fail");
                setErrorMsg("Ukuran gambar melebihi 512KB.");
                return;
            }

            const form = new FormData();
            form.append("file", blob, "capture.jpg");

            setPhase("analyzing");
            const csrf = getCsrfToken();
            const res = await postWithRetry(
                analyzeUrl,
                form,
                csrf ? { "X-CSRF-TOKEN": csrf } : undefined,
                timeoutMs
            );

            let data: CatApiResponse | any;
            try {
                data = await res.json();
            } catch {
                setPhase("fail");
                setErrorMsg("Respons tidak valid dari server.");
                return;
            }

            if (!res.ok || (data as any)?.ok === false) {
                setPhase("fail");
                setErrorMsg(humanizeError((data as any)?.code, res.status));
                return;
            }

            setPhase("success");
            sessionStorage.setItem("scan:result", JSON.stringify(data));

            const rid = res.headers.get("X-Request-ID");
            if (rid) sessionStorage.setItem("scan:rid", rid);

        } catch (e: any) {
            console.error("analyzeOnce error:", e);
            setPhase("fail");
            setErrorMsg(
                e?.name === "AbortError"
                    ? "Timeout koneksi."
                    : e?.message ?? "Terjadi kesalahan."
            );
        }
    }, [analyzeUrl, timeoutMs]);

    /**
     * Auto-run analyzeOnce once per mount (prevent multiple submissions on re-render).
     */
    const autoSentRef = useRef(false);
    useEffect(() => {
        if (autoSentRef.current) return;
        const hasImg = !!sessionStorage.getItem("scan:pendingImage");
        if (hasImg) {
            autoSentRef.current = true;
            void analyzeOnce();
        }
    }, [analyzeOnce]);

    /**
     * Listen for custom "scan:retry" events.
     * Triggers analyzeOnce when retry button is clicked elsewhere.
     */
    useEffect(() => {
        const handler = () => analyzeOnce();
        window.addEventListener("scan:retry", handler);
        return () => window.removeEventListener("scan:retry", handler);
    }, [analyzeOnce]);

    return (
        <div className="min-h-dvh w-full bg-[#0da0ff] text-slate-900 flex justify-center">
            <div className="w-full justify-between min-h-dvh">
                <div className="flex w-full h-full flex-col justify-center items-center lg:flex-row lg:items-start lg:justify-center px-4 pt-16 lg:px-0 lg:pt-0">
                    {/* Left / main visual */}
                    <div className="flex-1 flex items-center justify-center h-full">
                        <MediaPreview phase={phase} errorMsg={errorMsg} />
                    </div>

                    {isMobile && (
                        <div className="flex flex-1 px-0">
                            <BottomForm
                                open={open}
                                setOpen={setOpen}
                                status={geoStatus}
                                coords={coords}
                                address={addr}
                                updatedAt={updatedAt}
                                refreshLocation={askLocation}
                                clearLocation={clearLocation}
                            />
                        </div>
                    )}

                    {!isMobile && (
                        <div className="hidden md:flex flex-1 justify-center items-center">
                            <SideForm
                                status={geoStatus}
                                coords={coords}
                                address={addr}
                                updatedAt={updatedAt}
                                refreshLocation={askLocation}
                                clearLocation={clearLocation}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

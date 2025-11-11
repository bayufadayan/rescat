/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MediaPreview from "@/components/scan/details/media-preview";
import BottomForm from "@/components/scan/details/bottom-form";
import type { Coords, GeoStatus, Address } from "@/types/geo";
import { reverseGeocode } from "@/lib/helper/reverse-geocode";
import SideForm from "@/components/scan/details/side-form";
import { useRoute } from "ziggy-js";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    dataURLtoBlob,
    getCsrfToken,
    postWithRetry,
    humanizeError,
} from "@/lib/helper/upload";
import type { CatApiResponse } from "@/types/scan";

type Phase = "idle" | "uploading" | "analyzing" | "success" | "fail";

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

    // ===== GEO (tetap) =====
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

    const clearLocation = () => {
        setCoords(null);
        setAddr(null);
        setUpdatedAt(null);
        setGeoStatus("idle");
    };

    useEffect(() => {
        askLocation();
    }, []);

    // ===== GUARD sekali saat mount: boleh lanjut kalau ada pendingImage ATAU sudah ada result =====
    useEffect(() => {
        const hasImg = !!sessionStorage.getItem("scan:pendingImage");
        const hasResult = !!sessionStorage.getItem("scan:result");
        if (!hasImg && !hasResult) {
            window.location.href = route("scan.capture");
        }
        // sengaja [] biar tidak re-run
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ===== Freeze URL & timeout supaya dependensi stabil =====
    const analyzeUrl = useMemo(() => route("scan.analyze"), [route]);
    const timeoutMs = useMemo(
        () => Number((import.meta as any).env?.VITE_SCAN_TIMEOUT_MS ?? 5000),
        []
    );

    // ===== Kirim gambar (dipakai auto-run & tombol retry) =====
    const analyzeOnce = useCallback(async () => {
        try {
            const dataUrl = sessionStorage.getItem("scan:pendingImage");
            const meta = sessionStorage.getItem("scan:pendingMeta");
            if (!dataUrl || !meta) {
                // Tidak auto-redirect di sini; guard awal sudah handle
                return;
            }

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

            // success
            setPhase("success");
            sessionStorage.setItem("scan:result", JSON.stringify(data));
            const rid = res.headers.get("X-Request-ID");
            if (rid) sessionStorage.setItem("scan:rid", rid);

            // ⚠️ TIDAK menghapus pendingImage/pendingMeta di sini — biar halaman diem.
        } catch (e: any) {
            console.error('analyzeOnce error:', e);
            setPhase("fail");
            setErrorMsg(
                e?.name === "AbortError"
                    ? "Timeout koneksi."
                    : e?.message ?? "Terjadi kesalahan."
            );
        }

    }, [analyzeUrl, timeoutMs]);

    // ===== Auto-run HANYA SEKALI per mount walau re-render berkali-kali =====
    const autoSentRef = useRef(false);
    useEffect(() => {
        if (autoSentRef.current) return;
        const hasImg = !!sessionStorage.getItem("scan:pendingImage");
        if (hasImg) {
            autoSentRef.current = true;
            void analyzeOnce();
        }
    }, [analyzeOnce]);

    // ===== Listener "scan:retry" =====
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

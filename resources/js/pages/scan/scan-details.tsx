/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import MediaPreview from "@/components/scan/details/media-preview";
import BottomForm from "@/components/scan/details/bottom-form";
import type { Coords, GeoStatus, Address } from "@/types/geo";
import { reverseGeocode } from "@/lib/helper/reverse-geocode";
import SideForm from "@/components/scan/details/side-form";
import { useRoute } from 'ziggy-js';
import { useIsMobile } from "@/hooks/use-mobile";
import { dataURLtoBlob, fetchWithTimeout, getCsrfToken } from '@/lib/helper/upload';
import type { CatApiResponse } from '@/types/scan';

type Phase = 'idle' | 'uploading' | 'analyzing' | 'success' | 'fail';

export default function ScanDetails() {
    const route = useRoute();
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(true);

    const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
    const [coords, setCoords] = useState<Coords | null>(null);
    const [addr, setAddr] = useState<Address | null>(null);
    const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

    const [phase, setPhase] = useState<Phase>('idle');
    const [errorMsg, setErrorMsg] = useState<string>('');

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

    useEffect(() => {
        const doAnalyze = async () => {
            try {
                const dataUrl = sessionStorage.getItem('scan:pendingImage');
                if (!dataUrl) {
                    // gak ada gambar → balik ke capture
                    window.location.href = route('scan.capture');
                    return;
                }

                setPhase('uploading');
                const blob = dataURLtoBlob(dataUrl);

                // optional guard: maksimum 512 KB (sinkron dengan Laravel)
                if (blob.size > 512 * 1024) {
                    setPhase('fail');
                    setErrorMsg('Ukuran gambar melebihi 512KB.');
                    return;
                }

                const form = new FormData();
                form.append('file', blob, 'capture.jpg');

                // CSRF untuk web route
                const csrf = getCsrfToken();

                setPhase('analyzing');
                const res = await fetchWithTimeout(
                    route('scan.analyze'),
                    {
                        method: 'POST',
                        body: form,
                        headers: csrf ? { 'X-CSRF-TOKEN': csrf } : undefined,
                    },
                    Number(import.meta.env.VITE_SCAN_TIMEOUT_MS ?? 5000)
                );

                let data: CatApiResponse;
                try {
                    data = await res.json();
                } catch {
                    setPhase('fail');
                    setErrorMsg('Respons tidak valid dari server.');
                    return;
                }

                if (!res.ok || (data as any).ok === false) {
                    setPhase('fail');
                    const msg = (data as any)?.message ?? `Gagal (${res.status})`;
                    setErrorMsg(msg);
                } else {
                    setPhase('success');
                    // simpan hasil buat MediaPreview / halaman lain
                    sessionStorage.setItem('scan:result', JSON.stringify(data));
                }
            } catch (e: any) {
                setPhase('fail');
                setErrorMsg(e?.name === 'AbortError' ? 'Timeout koneksi.' : (e?.message ?? 'Terjadi kesalahan.'));
            }
        };

        doAnalyze();
    }, [route]);

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

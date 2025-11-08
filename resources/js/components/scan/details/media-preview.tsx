/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Check, X } from 'lucide-react';

type Props = {
    phase?: 'idle' | 'uploading' | 'analyzing' | 'success' | 'fail';
    errorMsg?: string;
};

export default function MediaPreview({ phase = 'idle', errorMsg = '' }: Props) {
    const [hero, setHero] = useState<string | null>(null);

    function formatBytes(bytes: number) {
        if (!Number.isFinite(bytes) || bytes <= 0) return '–';
        const units = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        let val = bytes;
        while (val >= 1024 && i < units.length - 1) { val /= 1024; i++; }
        const fixed = i === 0 ? 0 : (val < 10 ? 2 : 1); // 2 desimal untuk <10
        return `${val.toFixed(fixed)} ${units[i]}`;
    }

    const [meta, setMeta] = useState<null | {
        width: number; height: number; mime: string; quality: number;
        sizeBytes: number; createdAt: string; source: string;
    }>(null);


    useEffect(() => {
        try {
            const v = sessionStorage.getItem('scan:pendingImage');
            if (v) setHero(v);
            const m = sessionStorage.getItem('scan:pendingMeta');
            if (m) setMeta(JSON.parse(m));
        } catch { /* ignore */ }
    }, []);


    return (
        <div className="w-full md:max-w-2xl max-w-full pt-0 relative">
            <div className="h-20 w-20 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full z-20 shrink-0 grow-0 border-6 border-white flex items-center justify-center">
                {/* <Check className="text-white flex size-12" strokeWidth={3} /> */}
                <X className="text-white flex size-12" strokeWidth={3} />
            </div>
            <div className="w-fit h-auto bg-white border-6 border-white rounded-3xl overflow-hidden p-1 mx-auto max-w-[350px] md:max-w-lg">
                <div className="relative overflow-hidden rounded-2xl bg-green-500">
                    {hero ? (
                        <img src={hero} alt="Preview" className="h-[360px] w-full object-cover" />
                    ) : (
                        <div className="h-[360px] w-full grid place-items-center text-white/80">Tidak ada gambar</div>
                    )}
                    <button
                        type="button"
                        className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-lg bg-black/50 shadow-md"
                        title="Ulangi"
                        onClick={() => {
                            try {
                                sessionStorage.removeItem('scan:pendingImage');
                            } catch {
                                // ignore
                            }
                            window.history.back();
                        }}
                    >
                        <figure>
                            <img src="/images/icon/camera-rollback-icon.svg" alt="camera-rollback-icon.svg" />
                        </figure>
                    </button>
                </div>
                {meta && (
                    <div className="px-3 py-1 mt-2 mx-auto w-fit rounded-full bg-white text-slate-700 text-xs shadow">
                        {`${formatBytes(meta.sizeBytes)} • JPEG q${meta.quality.toFixed(1)} • ${meta.width}×${meta.height}`}
                    </div>
                )}
            </div>
            <div className="mt-2 flex w-full justify-center">
                <div className="grid place-items-center rounded-full bg-white shadow-md px-2 py-0">
                    <ChevronUp className="h-5 w-5 text-slate-600" strokeWidth={2.5} />
                </div>
            </div>
        </div>
    )
};

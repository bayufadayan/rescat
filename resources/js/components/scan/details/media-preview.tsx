import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Check } from 'lucide-react';

export default function MediaPreview() {
    const [hero, setHero] = useState<string | null>(null);

    useEffect(() => {
        try {
            const v = sessionStorage.getItem('scan:pendingImage');
            if (v) setHero(v);
        } catch {
            // ignore
        }
    }, []);

    return (
        <div className="w-full md:max-w-2xl max-w-full pt-0 relative">
            <div className="h-20 w-20 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full z-20 shrink-0 grow-0 border-6 border-white flex items-center justify-center">
                <Check className="text-white flex size-12" strokeWidth={3} />
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
            </div>
            <div className="mt-2 flex w-full justify-center">
                <div className="grid place-items-center rounded-full bg-white shadow-md px-2 py-0">
                    <ChevronUp className="h-5 w-5 text-slate-600" strokeWidth={2.5} />
                </div>
            </div>
        </div>
    )
};

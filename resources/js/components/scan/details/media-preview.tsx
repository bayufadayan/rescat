import React, { useMemo } from "react";
import { ChevronUp } from "lucide-react";
import { Check } from 'lucide-react';

export default function MediaPreview() {
    const hero = "https://picsum.photos/seed/cat-hero/800/1000.jpg"
    const thumbs = useMemo(
        () => Array.from({ length: 7 }).map((_, i) => `https://picsum.photos/seed/cat-${i + 1}/300/300.jpg`),
        []
    )

    return (
        <div className="w-full md:max-w-2xl max-w-full pt-0 relative">
            <div className="h-20 w-20 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full z-20 shrink-0 grow-0 border-6 border-white flex items-center justify-center">
                <Check className="text-white flex size-12" strokeWidth={3} />
            </div>
            <div className="w-fit h-auto bg-white border-6 border-white rounded-3xl overflow-hidden p-1 mx-auto max-w-[350px] md:max-w-lg">
                <div className="relative overflow-hidden rounded-2xl bg-green-500">
                    <img src={hero} alt="Preview" className="h-[360px] w-full object-cover" />

                    <button
                        type="button"
                        className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-lg bg-black/50 shadow-md"
                        title="Ulangi"
                    >
                        <figure>
                            <img src="/images/icon/camera-rollback-icon.svg" alt="camera-rollback-icon.svg" />
                        </figure>
                    </button>
                </div>

                <div className="mt-3 flex items-center gap-3 overflow-x-auto px-1 custom-scroll pb-2">
                    {thumbs.map((t, i) => (
                        <img key={i} src={t} alt={`thumb-${i}`} className="h-16 w-16 shrink-0 rounded-xl object-cover ring-2 ring-white" />
                    ))}
                </div>
            </div>

            <div className="mt-2 flex w-full justify-center">
                <div className="grid place-items-center rounded-full bg-white shadow-md px-2 py-0">
                    <ChevronUp className="h-5 w-5 text-slate-600" strokeWidth={2.5}/>
                </div>
            </div>
        </div>
    )
};

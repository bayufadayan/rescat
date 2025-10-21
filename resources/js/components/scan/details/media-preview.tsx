import React, { useMemo } from "react"
import { Dot, RefreshCw, ChevronUp } from "lucide-react"

const MediaPreview: React.FC = () => {
    const hero = "https://picsum.photos/seed/cat-hero/800/1000.jpg"
    const thumbs = useMemo(
        () => Array.from({ length: 5 }).map((_, i) => `https://picsum.photos/seed/cat-${i + 1}/300/300.jpg`),
        []
    )

    return (
        <div className="mx-auto w-full max-w-[400px] px-4">
            <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-xl">
                <img src={hero} alt="Preview" className="h-[360px] w-full object-cover" />

                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs text-slate-700">
                    <Dot className="h-5 w-5 -mx-2 text-emerald-500" />
                    <Dot className="h-5 w-5 -mx-2 text-slate-300" />
                    <Dot className="h-5 w-5 -mx-2 text-slate-300" />
                </div>

                <button
                    type="button"
                    className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-lg bg-white/90 text-slate-700 shadow"
                    title="Ulangi"
                >
                    <RefreshCw className="h-5 w-5" />
                </button>
            </div>

            <div className="mt-3 flex items-center gap-3 overflow-x-auto pb-1">
                {thumbs.map((t, i) => (
                    <img key={i} src={t} alt={`thumb-${i}`} className="h-16 w-16 shrink-0 rounded-xl object-cover ring-2 ring-white" />
                ))}
            </div>

            <div className="mt-3 flex w-full justify-center">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-white shadow">
                    <ChevronUp className="h-5 w-5 text-slate-600" />
                </div>
            </div>
        </div>
    )
}

export default MediaPreview

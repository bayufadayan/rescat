/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import { ChevronUp, Check, X, AlertTriangle } from "lucide-react";

type Phase = "idle" | "uploading" | "analyzing" | "success" | "fail";

type Props = {
    phase?: Phase;
    errorMsg?: string;
};

type Result = {
    ok: boolean;
    label?: "CAT" | "NON-CAT";
    cat_prob?: number;
    threshold?: number;
    request_id?: string;
    topk?: Array<{ label: string; prob: number }>;
    meta?: Record<string, any>;
    code?: string;
    message?: string;
};

export default function MediaPreview({ phase = "idle", errorMsg = "" }: Props) {
    const [hero, setHero] = useState<string | null>(null);
    const [meta, setMeta] = useState<null | {
        width: number;
        height: number;
        mime: string;
        quality: number;
        sizeBytes: number;
        createdAt: string;
        source: string;
    }>(null);
    const [result, setResult] = useState<Result | null>(null);

    useEffect(() => {
        try {
            const v = sessionStorage.getItem("scan:pendingImage");
            if (v) setHero(v);
            const m = sessionStorage.getItem("scan:pendingMeta");
            if (m) setMeta(JSON.parse(m));
            const r = sessionStorage.getItem("scan:result");
            if (r) setResult(JSON.parse(r));
        } catch {
            /* ignore */
        }
    }, [phase]); // refresh tampilan saat status berubah

    const verdict = useMemo(() => {
        if (phase === "uploading" || phase === "analyzing") return "loading" as const;
        if (phase === "fail") return "fail" as const;
        if (phase === "success") return result?.label === "CAT" ? "cat" : "noncat";
        return "idle" as const;
    }, [phase, result?.label]);

    const probText = useMemo(() => {
        const p = result?.cat_prob;
        return typeof p === "number" ? `p=${p.toFixed(2)}` : "";
    }, [result?.cat_prob]);

    function formatBytes(bytes: number) {
        if (!Number.isFinite(bytes) || bytes <= 0) return "–";
        const units = ["B", "KB", "MB", "GB"];
        let i = 0,
            val = bytes;
        while (val >= 1024 && i < units.length - 1) {
            val /= 1024;
            i++;
        }
        const fixed = i === 0 ? 0 : val < 10 ? 2 : 1;
        return `${val.toFixed(fixed)} ${units[i]}`;
    }

    const [requestId, setRequestId] = useState("");
    useEffect(() => {
        if (typeof window === "undefined") return;
        setRequestId(sessionStorage.getItem("scan:rid") ?? "");
    }, [phase]);

    const isAnalyzing = phase === "uploading" || phase === "analyzing";

    return (
        <div className="w-full md:max-w-2xl max-w-full pt-0 relative">
            {/* Overlay verdict bulat */}
            <div
                className="
        h-20 w-20 absolute left-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-full z-20 shrink-0 grow-0 border-8 border-white grid place-items-center
        "
                style={{
                    top: "0",
                    background:
                        verdict === "cat"
                            ? "#16a34a"
                            : verdict === "noncat" || verdict === "fail"
                                ? "#ef4444"
                                : verdict === "loading"
                                    ? "rgba(0,0,0,0.55)"
                                    : "rgba(239,68,68,1)",
                }}
                aria-live="polite"
            >
                {verdict === "loading" && (
                    <div className="h-10 w-10 rounded-full border-4 border-white/70 border-t-transparent animate-spin" />
                )}
                {verdict === "cat" && <Check className="text-white size-12" strokeWidth={3} />}
                {(verdict === "noncat" || verdict === "fail") && (
                    <X className="text-white size-12" strokeWidth={3} />
                )}
                {verdict === "idle" && <X className="text-white size-12" strokeWidth={3} />}
            </div>

            {/* Kartu gambar */}
            <div className="w-fit h-auto bg-white border-8 border-white rounded-3xl overflow-hidden p-1 mx-auto max-w-[350px] md:max-w-lg shadow">
                <div className="relative overflow-hidden rounded-2xl bg-neutral-200">
                    {hero ? (
                        <img src={hero} alt="Preview" className="h-[360px] w-full object-cover" />
                    ) : (
                        <div className="h-[360px] w-full grid place-items-center text-neutral-600">
                            Tidak ada gambar
                        </div>
                    )}

                    {/* Tombol ulangi */}
                    <button
                        type="button"
                        className={`absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-lg shadow-md ${isAnalyzing ? "bg-black/20 cursor-not-allowed" : "bg-black/50"
                            }`}
                        title={isAnalyzing ? "Sedang menganalisis…" : "Ulangi"}
                        onClick={() => {
                            if (isAnalyzing) return;
                            try {
                                sessionStorage.removeItem("scan:pendingImage");
                                sessionStorage.removeItem("scan:pendingMeta");
                                sessionStorage.removeItem("scan:result");
                                sessionStorage.removeItem("scan:rid");
                            } catch {
                                /* ignore */
                            }
                            window.history.back();
                        }}
                    >
                        <figure>
                            <img
                                src="/images/icon/camera-rollback-icon.svg"
                                alt="camera-rollback-icon.svg"
                            />
                        </figure>
                    </button>
                </div>

                {/* Badge meta (ukuran/format) */}
                {meta && (
                    <div className="px-3 py-1 mt-2 mx-auto w-fit rounded-full bg-white text-slate-700 text-xs shadow">
                        {`${formatBytes(meta.sizeBytes)} • JPEG q${meta.quality.toFixed(
                            1
                        )} • ${meta.width}×${meta.height}`}
                    </div>
                )}
            </div>

            {/* Teks ringkas di bawah preview */}
            <div className="mt-3 flex w-full justify-center">
                {verdict === "loading" && (
                    <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm text-slate-700 shadow">
                        <div className="h-3 w-3 rounded-full border-2 border-slate-500 border-t-transparent animate-spin" />
                        <span>Menganalisis…</span>
                    </div>
                )}

                {verdict === "cat" && (
                    <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-green-700 shadow">
                        <Check className="h-4 w-4" />
                        <span>
                            Gambar adalah <b>kucing</b>
                            {probText ? ` • ${probText}` : ""}
                        </span>
                    </div>
                )}

                {verdict === "noncat" && (
                    <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-red-700 shadow">
                        <X className="h-4 w-4" />
                        <span>
                            <b>Bukan</b> kucing{probText ? ` • ${probText}` : ""}
                        </span>
                    </div>
                )}

                {verdict === "fail" && (
                    <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-red-700 shadow">
                        <AlertTriangle className="h-4 w-4" />
                        <span>
                            Gagal menganalisis{errorMsg ? ` — ${errorMsg}` : ""}
                        </span>
                        <button
                            type="button"
                            className="ml-1 rounded-md px-2 py-0.5 text-xs bg-red-50 border border-red-200 hover:bg-red-100"
                            onClick={() => window.dispatchEvent(new CustomEvent("scan:retry"))}
                        >
                            Coba lagi
                        </button>
                    </div>
                )}
            </div>

            {/* RID mini (debug) */}
            {requestId && (
                <div className="mt-1 text-[10px] text-white/80 text-center">rid: {requestId}</div>
            )}

            {/* indicator kecil di bawah (tetap) */}
            <div className="mt-2 flex w-full justify-center">
                <div className="grid place-items-center rounded-full bg-white shadow-md px-2 py-0">
                    <ChevronUp className="h-5 w-5 text-slate-600" strokeWidth={2.5} />
                </div>
            </div>
        </div>
    );
}

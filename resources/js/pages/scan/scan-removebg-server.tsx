/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Head } from "@inertiajs/react";

type DroppedFile = File & { preview?: string };
type ProcessState = "idle" | "processing" | "done" | "error";

export default function ScanRemoveBGServer() {
    const [file, setFile] = useState<DroppedFile | null>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [resultBlob, setResultBlob] = useState<Blob | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const [state, setState] = useState<ProcessState>("idle");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // cleanup URL blob saat unmount
    useEffect(() => {
        return () => {
            if (file?.preview) URL.revokeObjectURL(file.preview);
            if (resultUrl) URL.revokeObjectURL(resultUrl);
        };
    }, [file?.preview, resultUrl]);

    const openPicker = useCallback(() => inputRef.current?.click(), []);

    // pilih file via input
    const onPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const picked = e.target.files?.[0];
        if (!picked) return;
        if (!picked.type.startsWith("image/")) {
            setErrorMsg("File harus gambar (jpg, jpeg, png, webp, dll).");
            return;
        }
        const preview = URL.createObjectURL(picked);
        const withPreview = Object.assign(picked, { preview });

        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(null);
        setResultBlob(null);
        setState("idle");
        setErrorMsg(null);
        setFile(withPreview);
    };

    // drag & drop
    const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files?.[0];
        if (!dropped) return;
        if (!dropped.type.startsWith("image/")) {
            setErrorMsg("File harus gambar (jpg, jpeg, png, webp, dll).");
            return;
        }

        const preview = URL.createObjectURL(dropped);
        const withPreview = Object.assign(dropped, { preview });

        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(null);
        setResultBlob(null);
        setState("idle");
        setErrorMsg(null);
        setFile(withPreview);
    };

    const canProcess = useMemo(
        () => !!file && state !== "processing",
        [file, state]
    );

    const resetAll = useCallback(() => {
        if (file?.preview) URL.revokeObjectURL(file.preview);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setFile(null);
        setResultUrl(null);
        setResultBlob(null);
        setState("idle");
        setErrorMsg(null);
    }, [file?.preview, resultUrl]);

    // 🔥 panggil endpoint Laravel
    const handleRemoveBg = useCallback(async () => {
        if (!file) return;
        setState("processing");
        setErrorMsg(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const csrfToken = (document.querySelector(
                'meta[name="csrf-token"]'
            ) as HTMLMetaElement | null)?.content;

            const res = await fetch("/scan/removebg-server/process", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    ...(csrfToken ? { "X-CSRF-TOKEN": csrfToken } : {}),
                },
                body: formData,
            });

            const contentType = res.headers.get("Content-Type") || "";

            // kalau bukan image/png → anggap error JSON
            if (!res.ok || !contentType.startsWith("image/")) {
                let msg = "Gagal menghapus background di server.";
                try {
                    const data = await res.json();
                    if (data?.message) msg = data.message;
                } catch {
                    // abaikan
                }
                throw new Error(msg);
            }

            const blob = await res.blob();
            const outUrl = URL.createObjectURL(blob);

            setResultBlob(blob);
            setResultUrl(outUrl);
            setState("done");
        } catch (err: any) {
            console.error(err);
            setErrorMsg(err?.message ?? "Gagal menghapus background. Coba lagi.");
            setState("error");
        }
    }, [file]);

    const downloadResult = useCallback(() => {
        if (!resultBlob) return;
        const url = resultUrl ?? URL.createObjectURL(resultBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "removed-bg-server.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }, [resultBlob, resultUrl]);

    return (
        <>
            <Head title="Server Remove Background" />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-10">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                        🖼️ Remove Background (Server + remove.bg)
                    </h1>

                    {!file ? (
                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragOver(true);
                            }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={onDrop}
                            onClick={openPicker}
                            className={[
                                "border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all",
                                dragOver
                                    ? "border-blue-400 bg-blue-50"
                                    : "border-gray-300 bg-gray-100 hover:bg-gray-200",
                            ].join(" ")}
                            role="button"
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={onPick}
                            />
                            <p className="text-gray-600">
                                <span className="font-medium text-blue-500">Seret/Drop</span> atau klik untuk pilih gambar
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                Gambar akan diupload ke server & diproses via remove.bg.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Original */}
                                <div className="relative">
                                    <img
                                        src={file.preview}
                                        alt="Original"
                                        className="w-full rounded-xl shadow-md object-contain max-h-[420px] border bg-white"
                                    />
                                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        Original
                                    </div>
                                </div>

                                {/* Result */}
                                <div className="relative h-[420px]">
                                    {state === "processing" && (
                                        <div className="w-full h-full grid place-content-center border rounded-xl bg-gray-50 text-gray-600 animate-pulse">
                                            Memproses di server…
                                        </div>
                                    )}

                                    {state === "done" && resultUrl && (
                                        <div className="relative h-full w-full rounded-xl overflow-hidden">
                                            <img
                                                src={resultUrl}
                                                alt="Result"
                                                className="w-full h-full object-contain rounded-xl shadow-md border bg-white"
                                            />
                                        </div>
                                    )}

                                    {!resultUrl && state !== "processing" && (
                                        <div className="w-full h-full grid place-content-center text-gray-500 border rounded-xl bg-gray-50">
                                            Hasil akan muncul di sini
                                        </div>
                                    )}

                                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        {state === "done"
                                            ? "Result (Server)"
                                            : state === "processing"
                                                ? "Processing…"
                                                : "Preview"}
                                    </div>
                                </div>
                            </div>

                            {errorMsg && (
                                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                    {errorMsg}
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    onClick={handleRemoveBg}
                                    disabled={!canProcess}
                                    className={[
                                        "bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition",
                                        !canProcess ? "opacity-60 cursor-not-allowed" : "",
                                    ].join(" ")}
                                >
                                    {state === "processing" ? "Memproses…" : "Hapus Background di Server"}
                                </button>

                                <button
                                    onClick={resetAll}
                                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl border hover:bg-gray-200"
                                >
                                    Reset
                                </button>

                                <div className="ml-auto">
                                    <button
                                        onClick={downloadResult}
                                        disabled={!resultBlob}
                                        className={[
                                            "bg-emerald-600 text-white px-4 py-2 rounded-xl shadow hover:bg-emerald-700 transition",
                                            !resultBlob ? "opacity-60 cursor-not-allowed" : "",
                                        ].join(" ")}
                                    >
                                        Download PNG
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-xs text-gray-500 mt-4">
                    Processed via remove.bg API (Laravel + PHP library).
                </div>
            </div>
        </>
    );
}

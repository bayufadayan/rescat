import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import { removeBackground } from "@imgly/background-removal";

type DroppedFile = File & { preview?: string };

type ProcessState = "idle" | "processing" | "done" | "error";

export default function ScanTry() {
    const [file, setFile] = useState<DroppedFile | null>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [resultBlob, setResultBlob] = useState<Blob | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const [state, setState] = useState<ProcessState>("idle");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);

    // revoke object URLs on cleanup
    useEffect(() => {
        return () => {
            if (file?.preview) URL.revokeObjectURL(file.preview);
            if (resultUrl) URL.revokeObjectURL(resultUrl);
        };
    }, [file?.preview, resultUrl]);

    const openPicker = useCallback(() => {
        inputRef.current?.click();
    }, []);

    const onPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const picked = e.target.files?.[0];
        if (!picked) return;
        if (!picked.type.startsWith("image/")) {
            setErrorMsg("File harus gambar (jpg, jpeg, png, webp, dll).");
            return;
        }
        const preview = URL.createObjectURL(picked);
        const withPreview = Object.assign(picked, { preview });
        // reset state jika ganti file
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(null);
        setResultBlob(null);
        setState("idle");
        setErrorMsg(null);
        setFile(withPreview);
    };

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

    const handleRemoveBg = useCallback(async () => {
        if (!file) return;
        setState("processing");
        setErrorMsg(null);

        // gunakan URL object agar efisien dan privacy-friendly
        const tempUrl = file.preview ?? URL.createObjectURL(file);
        try {
            // Pemanggilan paling aman (lib akan pilih backend terbaik: WebGPU/WebGL/CPU)
            const blob = await removeBackground(tempUrl);
            const outUrl = URL.createObjectURL(blob);
            setResultBlob(blob);
            setResultUrl(outUrl);
            setState("done");
        } catch (err) {
            console.error(err);
            setErrorMsg("Gagal menghapus background. Coba ganti gambar / reload halaman.");
            setState("error");
        } finally {
            if (!file.preview) URL.revokeObjectURL(tempUrl);
        }
    }, [file]);

    const resetAll = useCallback(() => {
        if (file?.preview) URL.revokeObjectURL(file.preview);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setFile(null);
        setResultUrl(null);
        setResultBlob(null);
        setState("idle");
        setErrorMsg(null);
    }, [file?.preview, resultUrl]);

    const canProcess = useMemo(() => !!file && state !== "processing", [file, state]);

    const downloadResult = useCallback(() => {
        if (!resultBlob) return;
        const a = document.createElement("a");
        const url = resultUrl ?? URL.createObjectURL(resultBlob);
        a.href = url;
        a.download = "removed-bg.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        // jangan revoke langsung di sini kalau url dipakai oleh <img> juga
    }, [resultBlob, resultUrl]);

    const copyToClipboard = useCallback(async () => {
        if (!resultBlob) return;
        try {
            const item = new ClipboardItem({ [resultBlob.type]: resultBlob });
            await navigator.clipboard.write([item]);
            alert("Gambar (PNG) sudah disalin ke clipboard ✅");
        } catch {
            alert("Browser tidak mendukung copy image ke clipboard. Silakan download saja.");
        }
    }, [resultBlob]);

    return (
        <>
            <Head title="Remove Background" />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-10">
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                        🖼️ Hapus Background Gambar (Client-Side)
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
                                dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-100 hover:bg-gray-200",
                            ].join(" ")}
                            role="button"
                            aria-label="Unggah gambar"
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
                            <p className="text-xs text-gray-500 mt-2">Semua proses berjalan di browser. Tidak upload ke server.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                                <div className="relative">
                                    {state === "processing" && (
                                        <div className="w-full h-[420px] rounded-xl border bg-gray-50 grid place-content-center">
                                            <div className="animate-pulse text-gray-600">Memproses…</div>
                                        </div>
                                    )}
                                    {state !== "processing" && resultUrl && (
                                        <img
                                            src={resultUrl}
                                            alt="Result"
                                            className="w-full rounded-xl shadow-md object-contain max-h-[420px] border bg-white"
                                        />
                                    )}
                                    {state !== "processing" && !resultUrl && (
                                        <div className="w-full h-[420px] rounded-xl border bg-gray-50 grid place-content-center text-gray-500">
                                            Hasil akan muncul di sini
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        {state === "done" ? "Result" : "Preview"}
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
                                    {state === "processing" ? "Memproses…" : "Hapus Background"}
                                </button>

                                <button
                                    onClick={resetAll}
                                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl border hover:bg-gray-200"
                                >
                                    Reset
                                </button>

                                <div className="ml-auto flex gap-3">
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

                                    <button
                                        onClick={copyToClipboard}
                                        disabled={!resultBlob}
                                        className={[
                                            "bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700 transition",
                                            !resultBlob ? "opacity-60 cursor-not-allowed" : "",
                                        ].join(" ")}
                                    >
                                        Copy to Clipboard
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-xs text-gray-500 mt-4">
                    Powered by <code>@imgly/background-removal</code>. Proses lokal (browser).
                </div>
            </div>
        </>
    );
}

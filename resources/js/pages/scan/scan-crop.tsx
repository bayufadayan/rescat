/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { useRoute } from "ziggy-js";
import { drawToSquareCanvas, canvasToBlob, compressWithBackoff } from "@/lib/helper/compress";
import { uploadToContent } from "@/lib/helper/content";
import { dataUrlToFile } from "@/lib/helper/dataUrlToFile";

type Area = { x: number; y: number; width: number; height: number };

export default function ScanCrop() {
    const route = useRoute();
    const [src, setSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [area, setArea] = useState<Area | null>(null);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string>("");

    useEffect(() => {
        try {
            const v = sessionStorage.getItem("scan:toCrop");
            if (v) setSrc(v);
        } catch {
            /* ignore */
        }
    }, []);

    const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
        setArea(croppedAreaPixels);
    }, []);

    const doCrop = useCallback(async () => {
        if (!src || !area || busy) return;
        setErr("");
        setBusy(true);
        try {
            // Load image
            const image = await new Promise<HTMLImageElement>((resolve, reject) => {
                const i = new Image();
                i.onload = () => resolve(i);
                i.onerror = reject;
                i.src = src;
            });

            // Render hasil crop → square 720
            const squareCanvas = drawToSquareCanvas(
                image,
                area.x,
                area.y,
                area.width,
                area.height,
                720
            );

            // Blob awal, lalu kompres ≤ 500KB
            const initialBlob = await canvasToBlob(squareCanvas, "image/jpeg", 0.92);
            const result = await compressWithBackoff(initialBlob, 500);

            const previewDataUrl = result.dataUrl;
            const meta = {
                width: result.width,
                height: result.height,
                mime: result.mime,
                quality: result.quality,
                sizeBytes: result.sizeBytes,
                createdAt: new Date().toISOString(),
                source: "gallery-crop",
            };

            // Siapkan File dari dataURL hasil kompres
            const filename = `shot-crop-${Date.now()}.jpg`;
            const file = dataUrlToFile(previewDataUrl, filename, result.mime || "image/jpeg");

            // Upload ke content service (FormData: bucket → file)
            const uploaded = await uploadToContent(file, "original-photo");
            // uploaded: { id, bucket, filename, originalName, mime, size, createdAt, url }

            // Simpan ke localStorage (ID & URL) + meta (tanpa base64)
            localStorage.setItem(
                "scan:original",
                JSON.stringify({
                    id: uploaded.id,
                    url: uploaded.url,
                    bucket: uploaded.bucket,
                    filename: uploaded.filename,
                    mime: uploaded.mime,
                    size: uploaded.size,
                    createdAt: uploaded.createdAt,
                })
            );
            localStorage.setItem("scan:meta", JSON.stringify(meta));

            // Bersihkan session lama
            sessionStorage.removeItem("scan:toCrop");

            // Lanjut ke details
            window.location.href = route("scan.details");
        } catch (e: any) {
            console.error(e);
            setErr(e?.message || "Gagal memproses/unggah gambar.");
            setBusy(false);
        }
    }, [src, area, busy, route]);

    const content = useMemo(() => {
        if (!src) return <div className="text-white/80">Tidak ada gambar</div>;
        return (
            <div className="relative w-full h-[70vh] bg-black">
                <Cropper
                    image={src}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    showGrid={false}
                    restrictPosition={false}
                />
            </div>
        );
    }, [src, crop, zoom, onCropComplete]);

    return (
        <div className="min-h-dvh w-full bg-neutral-900 text-white flex flex-col">
            <div className="p-4 text-center font-semibold">Sesuaikan Crop</div>

            <div className="flex-1">{content}</div>

            <div className="p-4 flex items-center justify-center gap-3">
                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full max-w-md"
                />
            </div>

            {err && (
                <div className="px-4 pb-1 text-center text-sm text-red-400">{err}</div>
            )}

            <div className="p-4 flex items-center justify-center gap-3">
                <Button
                    onClick={() => window.history.back()}
                    variant="ghost"
                    className="border border-white/20"
                    disabled={busy}
                >
                    Batal
                </Button>
                <Button onClick={doCrop} className="bg-white text-black" disabled={busy}>
                    {busy ? "Mengunggah..." : "Pakai Foto"}
                </Button>
            </div>
        </div>
    );
}

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { useRoute } from 'ziggy-js';
import { drawToSquareCanvas, canvasToBlob, compressWithBackoff } from '@/lib/helper/compress';

type Area = { x: number; y: number; width: number; height: number };

export default function ScanCrop() {
    const route = useRoute();
    const [src, setSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [area, setArea] = useState<Area | null>(null);

    useEffect(() => {
        try {
            const v = sessionStorage.getItem('scan:toCrop');
            if (v) setSrc(v);
        } catch {
            // ignore
        }
    }, []);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setArea(croppedAreaPixels);
    }, []);

    const doCrop = useCallback(async () => {
        if (!src || !area) return;

        const image = await new Promise<HTMLImageElement>((resolve, reject) => {
            const i = new Image();
            i.onload = () => resolve(i);
            i.onerror = reject;
            i.src = src;
        });

        // Render hasil crop ke square 720
        const squareCanvas = drawToSquareCanvas(
            image,
            area.x, area.y, area.width, area.height,
            720
        );

        // Blob awal kualitas tinggi -> kompres/backoff ≤ 500KB
        const initialBlob = await canvasToBlob(squareCanvas, 'image/jpeg', 0.92);
        const result = await compressWithBackoff(initialBlob, 500);

        // Simpan preview & meta
        const previewDataUrl = result.dataUrl;
        const meta = {
            width: result.width,
            height: result.height,
            mime: result.mime,
            quality: result.quality,
            sizeBytes: result.sizeBytes,
            createdAt: new Date().toISOString(),
            source: 'gallery-crop',
        };

        try {
            sessionStorage.setItem('scan:pendingImage', previewDataUrl);
            sessionStorage.setItem('scan:pendingMeta', JSON.stringify(meta));
            sessionStorage.removeItem('scan:toCrop');
        } catch {
            // ignore
        }

        window.location.href = route('scan.details');
    }, [src, area, route]);

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
            <div className="p-4 flex items-center justify-center gap-3">
                <Button onClick={() => window.history.back()} variant="ghost" className="border border-white/20">Batal</Button>
                <Button onClick={doCrop} className="bg-white text-black">Pakai Foto</Button>
            </div>
        </div>
    );
}

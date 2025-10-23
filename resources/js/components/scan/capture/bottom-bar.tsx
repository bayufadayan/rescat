import React, { useRef } from 'react';
import { useRoute } from 'ziggy-js';

type BottomBarProps = {
    onCapture: () => void
    onFlip: () => void
    lastShot: string | null
}

export default function BottomBar({ onCapture, onFlip }: BottomBarProps) {
    const route = useRoute();
    const fileRef = useRef<HTMLInputElement | null>(null);

    const openFile = () => fileRef.current?.click();
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                sessionStorage.setItem('scan:toCrop', String(reader.result));
            } catch {
                // ignore
            }
            window.location.href = route('scan.crop');
        };
        reader.readAsDataURL(f);
    };

    return (
        <div className="pointer-events-auto w-full z-20 flex items-center justify-between gap-8 md:gap-16 px-6 max-w-md">
            <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/30 backdrop-blur-sm"
                title="Rotate Camera"
                onClick={onFlip}
            >
                <figure>
                    <img src="/images/icon/rotate-camera-icon.svg" alt="rotate-camera-icon.svg" />
                </figure>
            </button>

            {/* Shutter */}
            <button
                type="button"
                aria-label="Ambil Gambar"
                onClick={onCapture}
                className="grid h-22 w-22 place-items-center rounded-full bg-[#2C2C2C] shadow-lg active:scale-95 p-2 border-4 border-[#7B7B7B]"
            >
                <figure className="w-full h-full aspect-square bg-transparent rounded-full overflow-hidden">
                    <img src="/images/icon/shutter-icon.svg" alt="shutter-icon" className='w-full h-full object-fit object-cover' />
                </figure>
            </button>

            {/* Thumbnail */}
            <div className={`h-12 w-12 overflow-hidden rounded-lg`}>
                <>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                    <button onClick={openFile}>
                        <figure className="grid h-full w-full place-items-center cursor-pointer">
                            <img src="/images/icon/gallery-icon.svg" alt="gallery-icon.svg" />
                        </figure>
                    </button>
                </>
            </div>
        </div>
    )
}

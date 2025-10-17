import React from 'react'
import { RotateCw, Image as ImageIcon } from 'lucide-react'

type BottomBarProps = {
    onCapture: () => void
    onFlip: () => void
    lastShot: string | null
}

const BottomBar: React.FC<BottomBarProps> = ({ onCapture, onFlip, lastShot }) => (
    <div className="pointer-events-auto absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-8 px-6">
        <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
            title="Rotate Camera"
            onClick={onFlip}
        >
            <RotateCw className="h-5 w-5 text-white/90" />
        </button>

        {/* Shutter */}
        <button
            type="button"
            aria-label="Ambil Gambar"
            onClick={onCapture}
            className="grid h-20 w-20 place-items-center rounded-full bg-white shadow-lg active:scale-95"
        >
            <span className="block h-16 w-16 rounded-full border-4 border-gray-300" />
        </button>

        {/* Thumbnail */}
        <div className="h-12 w-12 overflow-hidden rounded-lg border border-white/50 bg-black/40 backdrop-blur-sm">
            {lastShot ? (
                <img src={lastShot} alt="Terakhir" className="h-full w-full object-cover" />
            ) : (
                <div className="grid h-full w-full place-items-center">
                    <ImageIcon className="h-5 w-5 text-white/80" />
                </div>
            )}
        </div>
    </div>
)

export default BottomBar

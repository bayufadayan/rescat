import React from 'react';

type BottomBarProps = {
    onCapture: () => void
    onFlip: () => void
    lastShot: string | null
}

const BottomBar: React.FC<BottomBarProps> = ({ onCapture, onFlip, lastShot }) => (
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
        <div className={`h-12 w-12 overflow-hidden rounded-lg ${lastShot && " border border-white/50 bg-black/40 backdrop-blur-sm"}`}>
            {lastShot ? (
                <img src={lastShot} alt="Terakhir" className="h-full w-full object-cover" />
            ) : (
                <>
                    <input
                        id="gallery"
                        type="file"
                        name="gallery"
                        accept="image/*"
                        className="hidden"
                    />
                    <label htmlFor="gallery">
                        <figure className="grid h-full w-full place-items-center cursor-pointer">
                            <img src="/images/icon/gallery-icon.svg" alt="gallery-icon.svg" />
                        </figure>
                    </label>
                </>
            )}
        </div>
    </div>
)

export default BottomBar

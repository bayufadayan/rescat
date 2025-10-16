/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import {
    MicOff,
    ChevronDown,
    Info,
    RotateCw,
    Camera as CameraIcon,
    AlertCircle,
    Image as ImageIcon,
} from 'lucide-react'

/* ============================================================================
 * TYPES & UTILS
 * ==========================================================================*/

type RectLike = Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>

type CropBox = {
    sx: number
    sy: number
    sw: number
    sh: number
}

/**
 * Hitung mapping koordinat dari kotak overlay di layar (frameRect)
 * ke koordinat frame video asli (untuk di-crop pada canvas).
 * Video di-render dengan object-fit: cover sehingga perlu dihitung scaling & offset.
 */
function computeCropFromOverlay(params: {
    containerRect: RectLike
    frameRect: RectLike
    videoWidth: number
    videoHeight: number
}): CropBox {
    const { containerRect, frameRect, videoWidth, videoHeight } = params

    const scale = Math.max(
        containerRect.width / videoWidth,
        containerRect.height / videoHeight
    )
    const displayedW = videoWidth * scale
    const displayedH = videoHeight * scale
    const offsetLeft = (containerRect.width - displayedW) / 2
    const offsetTop = (containerRect.height - displayedH) / 2

    const relLeft = frameRect.left - containerRect.left - offsetLeft
    const relTop = frameRect.top - containerRect.top - offsetTop

    const sx = (relLeft / displayedW) * videoWidth
    const sy = (relTop / displayedH) * videoHeight
    const sw = (frameRect.width / displayedW) * videoWidth
    const sh = (frameRect.height / displayedH) * videoHeight

    return {
        sx: Math.max(0, sx),
        sy: Math.max(0, sy),
        sw: Math.max(1, sw),
        sh: Math.max(1, sh),
    }
}

/* ============================================================================
 * UI SUB-COMPONENTS (modular, all in one file)
 * ==========================================================================*/

const Header: React.FC = () => (
    <div className="pointer-events-auto absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-3">
        <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
            title="Mute mic (dummy)"
        >
            <MicOff className="h-5 w-5 text-white/90" />
        </button>

        <div className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-white/90 backdrop-blur-sm">
            <span className="text-xs font-semibold">MTM</span>
            <ChevronDown className="h-4 w-4" />
        </div>
    </div>
)

type WarningBannerProps = { children: React.ReactNode }
const WarningBanner: React.FC<WarningBannerProps> = ({ children }) => (
    <div className="pointer-events-none absolute left-0 right-0 bottom-28 z-20 flex w-full justify-center px-4">
        <div className="flex w-full max-w-md items-start gap-2 rounded-xl bg-white/95 p-3 text-sm text-gray-900 shadow">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="leading-snug">{children}</p>
        </div>
    </div>
)

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

type CameraStageProps = {
    webcamRef: React.MutableRefObject<Webcam | null>
    frameRef: React.MutableRefObject<HTMLDivElement | null>
    containerRef: React.MutableRefObject<HTMLDivElement | null>
    isReady: boolean
    mirrored: boolean
    onUserMedia?: () => void
    onUserMediaError?: (e: string | DOMException | Error) => void
}
const CameraStage: React.FC<CameraStageProps> = ({
    webcamRef,
    frameRef,
    containerRef,
    isReady,
    mirrored,
    onUserMedia,
    onUserMediaError,
}) => {
    return (
        <div
            ref={containerRef}
            className="relative mx-auto h-[92vh] w-full max-w-md overflow-hidden rounded-3xl bg-black"
        >
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                forceScreenshotSourceSize
                mirrored={mirrored}
                videoConstraints={{ facingMode: mirrored ? 'user' : 'environment' }}
                onUserMedia={onUserMedia}
                onUserMediaError={(err) => {
                    console.error(err)
                    onUserMediaError?.(err as Error)
                }}
                className="h-full w-full object-cover"
            />

            {/* Overlay kotak terang */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <div ref={frameRef} className="relative aspect-square w-[82%] rounded-2xl">
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/80 shadow-[0_0_0_2000px_rgba(0,0,0,0.55)]" />
                    <div className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5">
                        <Info className="h-4 w-4 text-white/90" />
                    </div>
                </div>
            </div>

            {/* Nuansa gradien bawah */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm" />

            {!isReady && (
                <div className="absolute inset-0 z-20 grid place-items-center bg-black/70">
                    <div className="flex items-center gap-2 text-white/90">
                        <CameraIcon className="h-5 w-5" />
                        <span>Menyiapkan kamera…</span>
                    </div>
                </div>
            )}
        </div>
    )
}

/* ============================================================================
 * MAIN PAGE
 * ==========================================================================*/

export default function ScanCapture() {
    const webcamRef = useRef<Webcam>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const frameRef = useRef<HTMLDivElement>(null)

    const [ready, setReady] = useState<boolean>(false)
    const [front, setFront] = useState<boolean>(false) // false=environment, true=user
    const [error, setError] = useState<string>('')
    const [lastShot, setLastShot] = useState<string | null>(null)

    const handleMediaReady = (): void => setReady(true)

    const handleCapture = useCallback((): void => {
        const video: HTMLVideoElement | undefined =
            (webcamRef.current?.video as HTMLVideoElement | undefined)

        const container = containerRef.current
        const frame = frameRef.current
        if (!video || !container || !frame) return
        if (video.videoWidth === 0 || video.videoHeight === 0) return

        const containerRect = container.getBoundingClientRect()
        const frameRect = frame.getBoundingClientRect()

        const { sx, sy, sw, sh } = computeCropFromOverlay({
            containerRect,
            frameRect,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
        })

        const size = Math.round(Math.min(sw, sh))
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size

        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size)

        const dataUrl = canvas.toDataURL('image/png')
        setLastShot(dataUrl)

        const w = window.open()
        if (w) {
            w.document.write(
                `<html><head><title>Hasil Scan</title></head><body style="margin:0;background:#111;display:grid;place-items:center;height:100vh"><img src="${dataUrl}" style="max-width:100%;height:auto;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.5)"/></body></html>`
            )
            w.document.close()
        }
    }, [])

    const flipCamera = (): void => setFront((p) => !p)

    return (
        <div className="relative min-h-screen w-full bg-neutral-900 text-white">
            <Header />

            <div className="pt-12">
                <CameraStage
                    webcamRef={webcamRef}
                    frameRef={frameRef}
                    containerRef={containerRef}
                    isReady={ready}
                    mirrored={front}
                    onUserMedia={handleMediaReady}
                    onUserMediaError={(e) =>
                        setError(typeof e === 'string' ? e : (e as Error)?.message ?? 'Camera error')
                    }
                />
            </div>

            <WarningBanner>Pastikan wajah kucing terlihat pada kotak terang.</WarningBanner>

            <BottomBar onCapture={handleCapture} onFlip={flipCamera} lastShot={lastShot} />

            {error && (
                <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-24">
                    <div className="mx-auto w-full max-w-md rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
                        {error}
                    </div>
                </div>
            )}

            <div className="pointer-events-none fixed bottom-2 left-0 right-0 z-0 mx-auto w-full max-w-md text-center text-xs text-white/50">
                Kamera: <span className="uppercase">{front ? 'user' : 'environment'}</span>
            </div>
        </div>
    )
}

import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam';
import Header from '@/components/scan/capture/header';
import WarningBanner from '@/components/scan/capture/warning-banner'
import BottomBar from '@/components/scan/capture/bottom-bar'
import CameraStage from '@/components/scan/capture/camera-stage'
import { computeCropFromOverlay } from '@/lib/helper/compute-crop-from-overlay'
import WatermarkBackground from '@/components/scan/capture/watermark-bg';

export default function ScanCapture() {
    const webcamRef = useRef<Webcam>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const frameRef = useRef<HTMLDivElement>(null)

    const [ready, setReady] = useState<boolean>(false)
    const [front, setFront] = useState<boolean>(false)
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
    }, [])

    const flipCamera = (): void => setFront((p) => !p)

    return (
        <div className="relative min-h-dvh h-dvh w-full bg-neutral-800">
            <div className='w-full h-full fixed z-0'>
                <WatermarkBackground />
            </div>

            <div className="absolute left-0 right-0 top-0 z-20 flex w-full h-16 justify-center items-center">
                <Header />
            </div>

            <div className="p-0 w-full h-screen">
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

            <div className="absolute inset-x-0 bottom-6 z-20 flex w-full h-16 justify-center items-center">
                <BottomBar onCapture={handleCapture} onFlip={flipCamera} lastShot={lastShot} />
            </div>

            {error && (
                <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-24">
                    <div className="mx-auto w-full max-w-md rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
                        {error}
                    </div>
                </div>
            )}

            <div className="pointer-events-none fixed bottom-1 left-0 right-0 z-0 mx-auto w-full max-w-md text-center text-xs text-white/50">
                Kamera: <span className="uppercase">{front ? 'user' : 'environment'}</span>
            </div>
        </div>
    )
}

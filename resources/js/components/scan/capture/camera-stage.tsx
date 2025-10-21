import React from "react";
import Webcam from 'react-webcam';
import { Camera as CameraIcon } from 'lucide-react';
import InfoTooltip from "./tooltip-info";

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
            className="relative mx-auto h-screen w-full max-w-lg overflow-hidden md:rounded-3xl bg-white"
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
            <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center">
                <div ref={frameRef} className="relative aspect-square w-[82%] rounded-2xl mt-24">
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/80 shadow-[0_0_0_2000px_rgba(0,0,0,0.55)]" />
                    <InfoTooltip />
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

export default CameraStage

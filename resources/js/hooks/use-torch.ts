import { RefObject, useCallback, useEffect, useState } from 'react';
import type Webcam from 'react-webcam';

type TorchCaps = MediaTrackCapabilities & { torch?: boolean };
type TorchConstraintSet = MediaTrackConstraintSet & { torch?: boolean };

export function useTorch(webcamRef: RefObject<Webcam | null>) {
    const [supported, setSupported] = useState(false);
    const [on, setOn] = useState(false);

    const getTrack = useCallback(() => {
        const video = webcamRef.current?.video as HTMLVideoElement | undefined;
        const stream = video?.srcObject as MediaStream | undefined;
        const track = stream?.getVideoTracks?.()[0];
        return track;
    }, [webcamRef]);

    const refreshSupport = useCallback(() => {
        const track = getTrack();
        const caps = track?.getCapabilities?.() as TorchCaps | undefined;
        setSupported(Boolean(caps && 'torch' in caps));
    }, [getTrack]);

    const setTorch = useCallback(
        async (value: boolean) => {
            const track = getTrack();
            const caps = track?.getCapabilities?.() as TorchCaps | undefined;
            if (!track || !caps || !('torch' in caps)) return;
            try {
                const constraints: MediaTrackConstraints = {
                    advanced: [{ torch: value }] as TorchConstraintSet[],
                };
                await track.applyConstraints(constraints);
                setOn(value);
            } catch {
                // Ignore
            }
        },
        [getTrack],
    );

    useEffect(() => {
        return () => {
            if (on) setTorch(false);
        };
    }, [on, setTorch]);

    return { supported, torchOn: on, setTorch, refreshSupport };
}

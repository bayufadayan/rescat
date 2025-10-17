import type { CropBox, RectLike } from '@/types/camera';

export function computeCropFromOverlay(params: {
    containerRect: RectLike;
    frameRect: RectLike;
    videoWidth: number;
    videoHeight: number;
}): CropBox {
    const { containerRect, frameRect, videoWidth, videoHeight } = params;

    const scale = Math.max(
        containerRect.width / videoWidth,
        containerRect.height / videoHeight,
    );
    const displayedW = videoWidth * scale;
    const displayedH = videoHeight * scale;
    const offsetLeft = (containerRect.width - displayedW) / 2;
    const offsetTop = (containerRect.height - displayedH) / 2;

    const relLeft = frameRect.left - containerRect.left - offsetLeft;
    const relTop = frameRect.top - containerRect.top - offsetTop;

    const sx = (relLeft / displayedW) * videoWidth;
    const sy = (relTop / displayedH) * videoHeight;
    const sw = (frameRect.width / displayedW) * videoWidth;
    const sh = (frameRect.height / displayedH) * videoHeight;

    return {
        sx: Math.max(0, sx),
        sy: Math.max(0, sy),
        sw: Math.max(1, sw),
        sh: Math.max(1, sh),
    };
}

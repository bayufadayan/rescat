export type RectLike = Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>;

export type CropBox = {
    sx: number;
    sy: number;
    sw: number;
    sh: number;
};

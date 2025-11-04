/* eslint-disable @typescript-eslint/no-explicit-any */
import imageCompression from 'browser-image-compression';

export type CompressResult = {
    blob: Blob;
    dataUrl: string;
    width: number;
    height: number;
    mime: string;
    quality: number;
    sizeBytes: number;
};

export function canvasToBlob(
    canvas: HTMLCanvasElement,
    mime = 'image/jpeg',
    quality = 0.7,
) {
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error('toBlob failed'))),
            mime,
            quality,
        );
    });
}

export function blobToDataURL(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = reject;
        r.readAsDataURL(blob);
    });
}

export function drawToSquareCanvas(
    source: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    target = 720,
) {
    const c = document.createElement('canvas');
    c.width = target;
    c.height = target;
    const ctx = c.getContext('2d')!;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, sx, sy, sw, sh, 0, 0, target, target);
    return c;
}

// helper untuk ambil dimensi dari dataURL
async function dataUrlToImageInfo(dataUrl: string) {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = reject;
        el.src = dataUrl;
    });
    return {
        width: img.naturalWidth || (img as any).width || 720,
        height: img.naturalHeight || (img as any).height || 720,
    };
}

// pastikan input berupa File (wrap Blob -> File jika perlu)
function ensureFile(
    input: File | Blob,
    fallbackName = 'input.jpg',
    fallbackType = 'image/jpeg',
): File {
    if (input instanceof File) return input;
    return new File([input], fallbackName, {
        type: (input as Blob).type || fallbackType,
    });
}

export async function compressWithBackoff(
    fileOrBlob: File | Blob,
    targetMaxKB = 500,
): Promise<CompressResult> {
    const targetMaxBytes = targetMaxKB * 1024;

    // sekali kompres → hasilkan blob + dataUrl + dimensi
    const once = async (
        input: File | Blob,
        maxW: number,
        q: number,
    ): Promise<CompressResult> => {
        const options = {
            maxWidthOrHeight: maxW,
            fileType: 'image/jpeg',
            initialQuality: q,
            useWebWorker: true,
        } as const;

        // ⬇️ fix utama: pastikan tipe File
        const fileInput = ensureFile(input, 'source.jpg', 'image/jpeg');

        const outFile = await imageCompression(fileInput, options); // returns File
        const outBlob: Blob = outFile; // File is-a Blob
        const dataUrl = await blobToDataURL(outBlob);
        const { width, height } = await dataUrlToImageInfo(dataUrl);

        return {
            blob: outBlob,
            dataUrl,
            width,
            height,
            mime: outBlob.type || 'image/jpeg',
            quality: q,
            sizeBytes: outBlob.size,
        };
    };

    // 1) 720, q=0.7
    let res = await once(fileOrBlob, 720, 0.7);
    if (res.sizeBytes <= targetMaxBytes) return res;

    // 2) 720, q=0.6
    res = await once(res.blob, 720, 0.6);
    if (res.sizeBytes <= targetMaxBytes) return res;

    // 3) 640, q=0.7
    res = await once(res.blob, 640, 0.7);
    if (res.sizeBytes <= targetMaxBytes) return res;

    // 4) 640, q=0.6
    res = await once(res.blob, 640, 0.6);
    return res;
}

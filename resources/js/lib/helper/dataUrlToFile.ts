export function dataUrlToFile(
    dataUrl: string,
    filename: string,
    fallbackType = 'image/jpeg',
): File {
    const [header, base64] = dataUrl.split(',');
    const match = /data:(.*?);base64/.exec(header);
    const mime = match?.[1] || fallbackType;
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return new File([bytes], filename, { type: mime });
}

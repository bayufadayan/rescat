// dataURL → Blob
export function dataURLtoBlob(dataURL: string): Blob {
    const [head, body] = dataURL.split(',');
    const isBase64 = head.includes('base64');
    const mime = head.match(/data:(.*?);/)?.[1] ?? 'image/jpeg';
    const bin = isBase64 ? atob(body) : decodeURIComponent(body);
    const len = bin.length;
    const u8 = new Uint8Array(len);
    for (let i = 0; i < len; i++) u8[i] = bin.charCodeAt(i);
    return new Blob([u8], { type: mime });
}

// fetch dengan timeout
export async function fetchWithTimeout(
    input: RequestInfo,
    init: RequestInit = {},
    ms = 5000,
) {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), ms);
    try {
        return await fetch(input, { ...init, signal: ctrl.signal });
    } finally {
        clearTimeout(id);
    }
}

// POST + retry 1x (backoff sederhana)
export async function postWithRetry(
    url: string,
    body: FormData,
    headers: Record<string, string> | undefined,
    timeoutMs = 5000,
) {
    const attempt = async () =>
        fetchWithTimeout(url, { method: 'POST', body, headers }, timeoutMs);
    try {
        return await attempt();
    } catch {
        await new Promise((r) => setTimeout(r, 700));
        return await attempt();
    }
}

// ambil CSRF token dari meta
export function getCsrfToken(): string | null {
    const el = document.querySelector(
        'meta[name="csrf-token"]',
    ) as HTMLMetaElement | null;
    return el?.content ?? null;
}

// mapping error ramah user
export function humanizeError(code?: string, status?: number) {
    if (code === 'FILE_TOO_LARGE' || status === 413)
        return 'Ukuran gambar terlalu besar.';
    if (code === 'UNSUPPORTED_MEDIA_TYPE' || status === 415)
        return 'Format file tidak didukung.';
    if (code === 'INVALID_FILE' || status === 400) return 'File tidak valid.';
    if (code === 'MODEL_NOT_READY' || status === 503)
        return 'Model belum siap.';
    if (code === 'INFERENCE_ERROR') return 'Gagal menjalankan inferensi.';
    if (code === 'FLASK_UNREACHABLE' || status === 502)
        return 'Server analisis tidak dapat dijangkau.';
    if (status && status >= 500) return 'Gangguan server.';
    return 'Terjadi kesalahan.';
}

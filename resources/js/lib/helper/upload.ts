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

export async function fetchWithTimeout(input: RequestInfo, init: RequestInit = {}, ms = 5000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(input, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(id);
  }
}

export function getCsrfToken(): string | null {
  const el = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
  return el?.content ?? null;
}

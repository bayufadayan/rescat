/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCsrfToken } from '@/lib/helper/upload';

export async function submitScanSession(createUrl: string, payload: any) {    
    const csrf = getCsrfToken();
    const res = await fetch(createUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(csrf ? { 'X-CSRF-TOKEN': csrf } : {}),
        },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
    });

    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) {
        const msg = data?.message || `Gagal membuat sesi (HTTP ${res.status})`;
        console.error(msg);
        console.log(res);
        throw new Error(msg);
    }
    return data;
}

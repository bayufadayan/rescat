/* eslint-disable @typescript-eslint/no-explicit-any */
export function buildSessionPayload(
    address: any,
    coords: { lat: number; lon: number } | null,
    opts?: { informer?: string; notes?: string },
) {
    const scanOption = localStorage.getItem('scanOption') || 'face';
    const scanType = localStorage.getItem('scanType') || 'quick';

    const original = safeParseLS('scan:original'); // { id, url, ... }
    const bb = safeParseLS('scan:bounding-box'); // { id, url }
    const roi = safeParseLS('scan:roi'); // { id, url }

    const locationStr =
        (address?.display as string) ??
        (coords ? `${coords.lat}, ${coords.lon}` : null);

    return {
        scan_type: scanOption, // → DB: scan_type
        checkup_type: scanType, // → DB: checkup_type ("quick"|"detail")

        latitude: coords?.lat ?? null,
        longitude: coords?.lon ?? null,
        location: locationStr ?? null,

        informer: opts?.informer ?? null, // "Anonim" atau nama
        notes: opts?.notes ?? null,

        images: {
            img_original_id: original?.id ?? null,
            img_original_url: original?.url ?? null,
            img_bounding_box_id: bb?.id ?? null,
            img_bounding_box_url: bb?.url ?? null,
            img_roi_id: roi?.id ?? null,
            img_roi_url: roi?.url ?? null,
            // remove_bg kalau nanti tersedia
        },
    };
}

function safeParseLS(key: string) {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : null;
    } catch {
        return null;
    }
}

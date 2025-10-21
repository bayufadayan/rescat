import type { Address, Coords } from '@/types/geo';

export async function reverseGeocode({ lat, lon }: Coords): Promise<Address> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const res = await fetch(url, {
        headers: {
            'Accept-Language': 'id,en;q=0.7',
            'User-Agent': 'scan-details-demo',
        },
    });
    if (!res.ok) throw new Error('Reverse geocode failed');
    const data = await res.json();
    const addr = data.address ?? {};
    return {
        display: data.display_name ?? '',
        city: addr.city || addr.town || addr.village || addr.county,
        state: addr.state,
        country: addr.country,
    };
}

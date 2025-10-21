export type Coords = { lat: number; lon: number };
export type GeoStatus = 'idle' | 'locating' | 'ready' | 'error';
export type Address = {
    display: string;
    city?: string;
    state?: string;
    country?: string;
};

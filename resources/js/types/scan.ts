/* eslint-disable @typescript-eslint/no-explicit-any */
export type RecognizeBlock = {
    label: 'CAT' | 'NON-CAT';
    cat_prob: number;
    threshold: number;
    topk: Array<{ label: string; prob: number }>;
    meta: Record<string, any>;
};

export type FacesBlock = {
    ok: boolean;
    faces_count?: number;
    chosen_conf?: number;
    box?: [number, number, number, number] | number[];
    note?: string;
    kept_confs_ge_min?: number[];
    meta?: Record<string, any>;
    roi_url?: string;
    preview_url?: string; // <— NEW: preview bounding box image
    roi_upload_error?: string;
    error?: string; // kalau face detector error
};

export type CatApiSuccessV1 = {
    ok: true;
    request_id: string;
    can_proceed: boolean;
    message: string;
    image_url?: string | null; // ROI URL (kalau ada)
    recognize: RecognizeBlock;
    faces: FacesBlock | null;
    meta: { api_latency_ms: number };
};

export type CatApiError = {
    ok: false;
    code: string;
    message: string;
};

export type CatApiResponse = CatApiSuccessV1 | CatApiError;

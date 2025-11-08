/* eslint-disable @typescript-eslint/no-explicit-any */
export type CatApiSuccess = {
    ok: true;
    label: 'CAT' | 'NON-CAT';
    cat_prob: number;
    threshold: number;
    topk: Array<{ label: string; prob: number }>;
    request_id: string;
    meta: Record<string, any>;
};

export type CatApiError = {
    ok: false;
    code: string;
    message: string;
};

export type CatApiResponse = CatApiSuccess | CatApiError;

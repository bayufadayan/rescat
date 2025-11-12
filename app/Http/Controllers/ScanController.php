<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ScanController extends Controller
{
    public function index()
    {
        return redirect()->route('scan.options');
    }

    public function options()
    {
        return Inertia::render('scan/scan-options');
    }
    public function capture()
    {
        return Inertia::render('scan/scan-capture');
    }
    public function crop()
    {
        return Inertia::render('scan/scan-crop');
    }
    public function analyze(Request $request): JsonResponse
    {
        // 1) Validasi dengan mapping status & code yang konsisten dgn FE
        try {
            $request->validate([
                'file' => 'required|image|mimes:jpg,jpeg,png|max:512',
            ]);
        } catch (ValidationException $e) {
            $failed = $e->validator->failed();
            $code = 'INVALID_FILE';
            $status = 400;

            if (isset($failed['file']['Mimes'])) {
                $code = 'UNSUPPORTED_MEDIA_TYPE';
                $status = 415;
            } elseif (isset($failed['file']['Max'])) {
                $code = 'FILE_TOO_LARGE';
                $status = 413;
            } elseif (isset($failed['file']['Image'])) {
                $code = 'INVALID_FILE';
                $status = 400;
            } elseif (isset($failed['file']['Required'])) {
                $code = 'INVALID_FILE';
                $status = 400;
            }

            return response()->json([
                'ok' => false,
                'code' => $code,
                'message' => $this->errorMessageForCode($code),
            ], $status);
        }

        // 2) Panggil Flask
        $flaskUrl = rtrim(env('FLASK_CAT_API_URL'), '/') . '/recognize';
        $file = $request->file('file');

        try {
            $resp = Http::timeout(15)
                ->retry(1, 300)
                ->attach('file', file_get_contents($file->getRealPath()), $file->getClientOriginalName())
                ->post($flaskUrl);

            $rid = $resp->header('X-Request-ID') ?? Str::lower(Str::random(8));
            $payload = $resp->json();

            if (is_null($payload)) {
                return response()->json([
                    'ok' => false,
                    'code' => 'INVALID_FLASK_RESPONSE',
                    'message' => 'Respons tidak valid dari server analisis.',
                ], 502);
            }

            // 3) Normalisasi jadi CatApiSuccessV1
            $out = $this->mapFlaskToCatApi($payload, $rid);

            // Untuk hasil konten (CAT/NON-CAT; 0/multi face), selalu 200
            return response()->json($out, 200)->withHeaders(['X-Request-ID' => $rid]);
        } catch (\Throwable $e) {
            Log::error('Analyze error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'ok' => false,
                'code' => 'FLASK_UNREACHABLE',
                'message' => 'Gagal terhubung ke server analisis.',
            ], 502);
        }
    }

    private function errorMessageForCode(string $code): string
    {
        return match ($code) {
            'FILE_TOO_LARGE' => 'Ukuran gambar terlalu besar.',
            'UNSUPPORTED_MEDIA_TYPE' => 'Format file tidak didukung.',
            'INVALID_FILE' => 'File tidak valid.',
            default => 'Terjadi kesalahan.',
        };
    }

    /**
     * Map JSON Flask → CatApiSuccessV1 (TS: scan.ts)
     */
    private function mapFlaskToCatApi(array $src, string $rid): array
    {
        $faces = $src['faces'] ?? null;
        $facesCount = is_array($faces) ? ($faces['faces_count'] ?? null) : null;
        $roiUrl = is_array($faces) ? ($faces['roi']['url'] ?? null) : null;
        $previewUrl = is_array($faces) ? ($faces['preview']['url'] ?? null) : null; // ← NEW

        $canProceed = ($facesCount === 1);

        if (($src['label'] ?? null) === 'NON-CAT') {
            $message = 'Bukan kucing.';
        } elseif ($facesCount === 1) {
            $message = 'Terdeteksi tepat 1 wajah kucing.';
        } elseif (is_numeric($facesCount) && $facesCount > 1) {
            $message = 'Terdeteksi lebih dari satu wajah.';
        } else {
            $message = 'Tidak ada wajah kucing terdeteksi.';
        }

        return [
            'ok' => true,
            'request_id' => $src['request_id'] ?? $rid,
            'can_proceed' => $canProceed,
            'message' => $message,
            'image_url' => $roiUrl,

            'recognize' => [
                'label' => $src['label'] ?? 'NON-CAT',
                'cat_prob' => $src['cat_prob'] ?? 0.0,
                'threshold' => $src['threshold'] ?? 0.5,
                'topk' => $src['topk'] ?? [],
                'meta' => $src['meta'] ?? [],
            ],

            'faces' => $faces ? [
                'ok' => (bool)($faces['ok'] ?? false),
                'faces_count' => $faces['faces_count'] ?? null,
                'chosen_conf' => $faces['chosen_conf'] ?? null,
                'box' => $faces['box'] ?? null,
                'note' => $faces['note'] ?? null,
                'kept_confs_ge_min' => $faces['kept_confs_ge_min'] ?? [],
                'meta' => $faces['meta'] ?? [],
                'roi_url' => $roiUrl,
                'preview_url' => $previewUrl, // ← NEW
                'roi_upload_error' => $faces['roi_upload_error'] ?? null,
                'error' => $faces['error'] ?? null,
            ] : null,

            'meta' => [
                'api_latency_ms' => (int)($src['meta']['api_latency_ms'] ?? 0),
            ],
        ];
    }


    public function details()
    {
        return Inertia::render('scan/scan-details');
    }

    public function process()
    {
        return Inertia::render('scan/scan-process');
    }

    public function results()
    {
        return Inertia::render('scan/scan-results');
    }

    public function removebg()
    {
        return Inertia::render('scan/scan-removebg');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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
    public function analyze(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpg,jpeg,png|max:512',
        ]);

        $flaskUrl = rtrim(env('FLASK_CAT_API_URL', 'http://127.0.0.1:5000'), '/') . '/predict/image';
        $file = $request->file('file');

        try {
            $resp = Http::timeout(5)->retry(1, 200)
                ->attach('file', file_get_contents($file->getRealPath()), $file->getClientOriginalName())
                ->post($flaskUrl);

            $payload = $resp->json();
            $status  = $resp->status();
            $rid     = $resp->header('X-Request-ID');

            return response()->json($payload, $status)
                ->withHeaders($rid ? ['X-Request-ID' => $rid] : []);
        } catch (\Throwable $e) {
            return response()->json([
                'ok' => false,
                'code' => 'FLASK_UNREACHABLE',
                'message' => 'Gagal terhubung ke server analisis.',
                'error' => $e->getMessage(),
            ], 502);
        }
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
}

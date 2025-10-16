<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
    public function details()
    {
        return Inertia::render('scan/scan-details');
    }

    public function process()
    {
        return Inertia::render('scan/scan-process');
    }
}

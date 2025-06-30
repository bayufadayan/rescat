<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (!request()->cookie('splash_shown')) {
        return response(view('splash'))
            ->cookie('splash_shown', true, 5);
    }

    return view('dashboard');
});

Route::get('/reset-splash', function () {
    return response("Cookie splash_shown dihapus. <a href='/'>Kembali</a>")
        ->withCookie(cookie()->forget('splash_shown'));
});
Route::get('/dashboard', function () {
    return view('dashboard');
});
Route::get('/scan', function () {
    return view('scan');
});

Route::get('/report', function () {
    return view('splash');
});

Route::get('/result', function () {
    return view('splash');
});

Route::get('/ping', function () {
    return view('ping');
});

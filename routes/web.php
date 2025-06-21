<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('splash');
});

Route::get('/dashboard', function () {
    return view('dashboard');
});

Route::get('/ping', function () {
    return view('ping');
});

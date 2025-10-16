<?php

use App\Http\Controllers\AppStartController;
use App\Http\Controllers\ScanController;
use App\Http\Controllers\Auth\GoogleAuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AppStartController::class, 'root'])->name('home');
Route::post('/set-splash', [AppStartController::class, 'setSplashSeen']);
Route::get('/onboarding', [AppStartController::class, 'onboarding'])->name('onboarding');
Route::prefix('scan')->group(function () {
    Route::get('/', [ScanController::class, 'index'])->name('scan');
    Route::get('/options', [ScanController::class, 'options'])->name('scan.options');
    Route::get('/capture', [ScanController::class, 'capture'])->name('scan.capture');
});
Route::prefix('petcares')->group(function () {
    Route::get('/', function () {
        return Inertia::render('splash');
    })->name('petcares');
});
Route::prefix('articles')->group(function () {
    Route::get('/', function () {
        return Inertia::render('splash');
    })->name('articles');
});

Route::middleware('guest')->group(function () {
    Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])
        ->name('google.redirect');

    Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])
        ->name('google.callback');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', fn() => Inertia::render('admin/dashboard'))
            ->name('dashboard');
    });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

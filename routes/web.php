<?php

use App\Http\Controllers\AppStartController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [AppStartController::class, 'splash'])->name('splash');
Route::get('/onboarding', [AppStartController::class, 'onboarding'])->name('onboarding');
Route::get('/login2', function () {
    return Inertia::render('authh/login');
})->name('login2');
Route::get('/sign-up', function () {
    return Inertia::render('authh/register');
})->name('signup');
Route::get('/forgot-password2', function () {
    return Inertia::render('authh/forgot-password');
})->name('forgot-password2');
Route::get('/reset-password2', function () {
    return Inertia::render('authh/reset-password');
})->name('reset-password2');
Route::get('/verify-email2', function () {
    return Inertia::render('authh/verify-email');
})->name('verify-email2');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

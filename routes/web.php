<?php

use App\Http\Controllers\AppStartController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [AppStartController::class, 'splash'])->name('splash');
Route::get('/onboarding', [AppStartController::class, 'onboarding'])->name('onboarding');
Route::middleware(['auth','role:admin'])->get('/_role-check', fn () => 'ok admin');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

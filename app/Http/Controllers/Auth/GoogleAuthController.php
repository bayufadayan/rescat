<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Spatie\Permission\Models\Role;

class GoogleAuthController extends Controller
{
    public function redirect(): RedirectResponse
    {
        /** @var \Laravel\Socialite\Two\GoogleProvider $google */
        $google = Socialite::driver('google');
        $google->scopes(['email', 'profile']);

        return $google->redirect();
    }

    public function callback(): RedirectResponse
    {
        // kalau dev-mu sering bentrok session/cookie: pakai ->stateless()->user()
        $googleUser = Socialite::driver('google')->user();

        $email = strtolower($googleUser->getEmail());

        $user = DB::transaction(function () use ($googleUser, $email) {
            // 1) Sudah terhubung?
            $linked = User::where('google_id', $googleUser->getId())->first();
            if ($linked) {
                $linked->update([
                    'google_token'         => $googleUser->token ?? null,
                    'google_refresh_token' => $googleUser->refreshToken ?? null,
                    'avatar'               => $linked->avatar ?: $googleUser->avatar,
                ]);
                return $linked;
            }

            // 2) Ada akun dengan email yang sama? → hubungkan
            $existing = User::where('email', $email)->first();
            if ($existing) {
                $existing->update([
                    'google_id'            => $googleUser->getId(),
                    'google_token'         => $googleUser->token ?? null,
                    'google_refresh_token' => $googleUser->refreshToken ?? null,
                    'avatar'               => $existing->avatar ?: $googleUser->avatar,
                    'email_verified_at'    => $existing->email_verified_at ?? now(),
                ]);
                return $existing;
            }

            // 3) Buat user baru
            $user = User::create([
                'name'                  => $googleUser->getName() ?: Str::before($email, '@'),
                'email'                 => $email,
                'password'              => Hash::make(Str::random(32)), // dummy
                'google_id'             => $googleUser->getId(),
                'google_token'          => $googleUser->token ?? null,
                'google_refresh_token'  => $googleUser->refreshToken ?? null,
                'avatar'                => $googleUser->avatar,
                'email_verified_at'     => now(), // verified via Google
            ]);

            // pastikan role 'user' ada
            Role::findOrCreate('user', 'web');
            $user->assignRole('user');

            return $user;
        });

        // login + regenerate session
        Auth::login($user, remember: true);
        request()->session()->regenerate();

        // redirect per-role (admin → /admin/dashboard)
        $redirect = $user->hasRole('admin')
            ? route('admin.dashboard', absolute: false)
            : route('dashboard', absolute: false);

        return redirect()->intended($redirect);
    }
}

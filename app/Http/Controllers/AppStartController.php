<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AppStartController extends Controller
{
    public function splash() {
        return Inertia('splash');
    }

    public function onboarding() {
        return Inertia('onboarding/onboarding-page');
    }
}

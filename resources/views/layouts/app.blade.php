<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'My App')</title>
    <link rel="icon" type="image/png" href="{{ asset('images/logo-rescat.png') }}">
    @vite('resources/css/app.css')
    <link rel="stylesheet" href="style.css">
</head>

<body class="bg-gray-100 text-gray-800 urbanistFont m-0">
    <header class="w-full flex items-center justify-center">
        <img src="{{ asset('images/logo-rescat.png') }}" alt="logo-rescat" class="w-32 h-auto my-4 md:w-18">
    </header>

    <main class="">
        @yield('content')
    </main>

</body>

</html>

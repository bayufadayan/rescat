<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'My App')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/png" href="{{ asset('images/logo-rescat.png') }}">
    @vite('resources/css/app.css')
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="build/assets/app-BKcve7jC.css">
    <script src="build/assets/app-T1DpEqax.js"></script>
    <script src="script.js"></script>
</head>

<body class="bg-gray-100 text-gray-800 urbanistFont m-0">
    <header class="w-full flex items-center justify-center">
        <img src="{{ asset('images/logo-rescat.png') }}" alt="logo-rescat" 
        class="w-12 sm:w-14 md:w-16 lg:w-18 h-auto transition-all duration-300 my-2 md:my-4"
        >
    </header>

    <main class="">
        @yield('content')
    </main>

</body>

</html>

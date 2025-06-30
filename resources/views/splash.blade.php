<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="build/assets/app-DIZS7WGS.css">
    <link rel="icon" type="image/png" href="{{ asset('images/logo-rescat.png') }}">
    <title>Welcome to ResCat.life</title>
</head>

<body>
    <div class="h-screen flex flex-col items-center justify-center gap-4 relative">
        <img src="{{ asset('images/logo-rescat.png') }}" alt="logo-rescat" class="w-42 h-auto">
        <p class="text-center urbanistFont leading-5 text-base font-semibold text-[#0091F3]">
            Lihat Lebih Dekat. <br>
            Selamatkan Lebih Cepat. <br>
        </p>

        <svg class="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"
            viewBox="0 0 24 24"></svg>

        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 urbanistFont flex flex-col text-xs text-center italic">
            <p>v. 1.0.0</p>
            <p>Made by @bayufadayan</p>
        </div>
    </div>

    <script>
        setTimeout(() => {
            window.location.href = "/";
        }, 3000);
    </script>
</body>

</html>

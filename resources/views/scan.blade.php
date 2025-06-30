@extends('layouts.app')

@section('title', 'Scan Your Finding Cats, and Save Them!')
@php
    $hideHeader = true;
@endphp

@section('content')
    <!-- Header -->
    <header class="flex items-center justify-center h-14 bg-white shadow relative">
        <button class="absolute left-4 text-blue-500">
            <!-- Icon back -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <h1 class="text-base font-semibold text-gray-700">Analisis Kondisi Kucing</h1>
    </header>

    <!-- Camera Section -->
    <section class="w-full px-4 mt-4">
        <div class="mb-2">
            <label for="cameraSelect" class="text-sm text-gray-700">Pilih Kamera:</label>
            <select id="cameraSelect" class="w-full border rounded px-2 py-1 text-sm">
                <option value="">Mendeteksi kamera...</option>
            </select>
        </div>

        <div class="rounded-xl overflow-hidden relative">
            <video id="camera-stream" autoplay playsinline class="w-full object-cover h-80 rounded-xl"></video>

            <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
                <div class="w-56 h-56 border-4 border-blue-400 rounded-3xl"></div>
            </div>
        </div>
    </section>

    <!-- Location Section -->
    <section class="mt-4 px-4">
        <div class="bg-blue-100 rounded-xl p-3 text-sm text-gray-700 leading-tight">
            <p>Jl. Raya Cangkrang RT 01/02, Desa Cikarawang, Kec Dramaga, Kab. Bogor, Jawa Barat, 16680</p>
            <p class="text-xs mt-1 text-blue-600">-7.328473, 106.439843</p>
        </div>
    </section>

    <!-- Button Pilih Gambar -->
    <section class="mt-4 px-4">
        <button
            class="w-full bg-blue-500 text-white rounded-lg py-2 flex items-center justify-center gap-2 shadow hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h2l2-3h10l2 3h2v13H3V7z" />
            </svg>
            Pilih Gambar
        </button>
    </section>

    <!-- Bottom Bar -->
    <section class="fixed bottom-4 left-0 w-full px-6">
        <div class="flex items-center justify-between">
            <!-- Gallery Button -->
            <button class="bg-blue-100 p-3 rounded-full shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4-4-4-4m6 8l4-4-4-4" />
                </svg>
            </button>

            <!-- Shutter Button -->
            <button class="bg-blue-500 p-5 rounded-full shadow-lg border-4 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
            </button>

            <!-- Spacer -->
            <div class="w-12"></div>
        </div>
    </section>

    <script>
        const video = document.getElementById('camera-stream');
        const cameraSelect = document.getElementById('cameraSelect');
        let currentStream = null;

        async function getCameras() {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            cameraSelect.innerHTML = '';

            videoDevices.forEach((device, index) => {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.text = device.label || `Kamera ${index + 1}`;
                cameraSelect.appendChild(option);
            });

            if (videoDevices.length > 0) {
                startCamera(videoDevices[0].deviceId); // default kamera pertama
            }
        }

        async function startCamera(deviceId) {
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        deviceId: {
                            exact: deviceId
                        }
                    },
                    audio: false
                });
                video.srcObject = stream;
                currentStream = stream;
            } catch (err) {
                console.error('Gagal akses kamera:', err);
                alert('Tidak dapat membuka kamera. Periksa izin atau perangkat.');
            }
        }

        cameraSelect.addEventListener('change', () => {
            const selectedDeviceId = cameraSelect.value;
            if (selectedDeviceId) {
                startCamera(selectedDeviceId);
            }
        });

        // Minta izin dulu agar bisa dapat label kamera
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(() => {
            getCameras();
        });
    </script>
@endsection

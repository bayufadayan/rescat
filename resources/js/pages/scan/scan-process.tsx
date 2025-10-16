// Halaman loading seperti nunggu hasil, 
// kalau hasil blm keluar dan pengen ke result tetep ngga bisa,
// jadi di redrect ke sini

import React from 'react';
import { Home, Info } from 'lucide-react';

export default function ScanProcess() {
    return (
        <main className='min-h-svh max-h-lvh h-screen flex items-center justify-center bg-[linear-gradient(to_bottom,_#0091F3,_#21A6FF)] relative'>
            {/* <div className="absolute w-full h-full bg-[url('/images/background/pink-purple.png')] bg-cover bg-center bg-no-repeat mix-blend-soft-light" /> */}
            <div className="h-full w-full flex flex-col justify-between py-4 px-8">
                <div className='flex justify-between items-center w-full  text-white'>
                    <button><Home /></button>
                    <h4 className='font-bold text-xl text-center flex-1'>Scanning...</h4>
                    <button className='invisible'><Home /></button>
                </div>
                <div className='flex items-center justify-center flex-col relative'>
                    {/* Code di sini */}
                    <div className="flex flex-col items-center gap-6">
                        {/* Avatar + Circular Progress */}
                        <div className="relative h-72 w-72">
                            {/* Ring statis tipis sebagai latar */}
                            <svg
                                viewBox="0 0 120 120"
                                className="absolute inset-0 h-full w-full"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="54"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.35)"
                                    strokeWidth="8"
                                />
                            </svg>

                            {/* Arc berputar (indeterminate) */}
                            <svg
                                viewBox="0 0 120 120"
                                className="absolute inset-0 h-full w-full animate-[spin_1.3s_linear_infinite]"
                                aria-hidden="true"
                            >
                                {/* gunakan strokeDasharray agar hanya sebagian lingkaran yang terlihat */}
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="54"
                                    fill="none"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeWidth="8"
                                    // arc ~ 80px dan sisa "kosong"
                                    strokeDasharray="80 400"
                                />
                            </svg>

                            {/* Avatar bulat di tengah */}
                            <img
                                src="https://picsum.photos/seed/scan-face/600/600"
                                alt="subject"
                                className="absolute left-1/2 top-1/2 h-56 w-56 shrink-0 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-xl ring-4 ring-white/70"
                            />
                        </div>

                        {/* Status text */}
                        <div className="flex flex-col items-center gap-2">
                            <p className="flex items-center gap-2 text-white/95">
                                <span className="inline-block h-3 w-3 animate-[spin_1s_linear_infinite] rounded-full border-2 border-white border-t-transparent" />
                                <span className="text-base font-semibold tracking-wide">
                                    Scoring grimace scale …
                                </span>
                            </p>
                            <p className="flex items-center gap-2 text-white/90">
                                <span className="inline-block h-3 w-3 animate-[spin_1s_linear_infinite] rounded-full border-2 border-white border-t-transparent" />
                                <span className="text-sm">Getting final score …</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='bg-white shadow-md w-full rounded-full p-2 flex flex-row gap-2 items-center max-w-lg self-center'>
                    <Info height={20} width={20} className='text-amber-500' />
                    <p className='flex flex-1 text-black text-xs'>Anda dapat kembali ke beranda jika terlalu lama</p>
                </div>
            </div>
        </main>
    )
}

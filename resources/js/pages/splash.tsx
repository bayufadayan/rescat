import React from 'react';
import LottiePlayer from '@/components/lottie/LottiePlayer';

export default function Splash() {
    return (
        <main className='min-h-svh max-h-lvh h-screen flex items-center justify-center bg-[linear-gradient(to_bottom,_#0091F3,_#21A6FF)] relative'>
            <div className="absolute w-full h-full bg-[url('/images/background/pink-purple.png')] bg-cover bg-center bg-no-repeat mix-blend-soft-light" />
            <div className="h-full w-full flex flex-col justify-between py-4 px-8">
                <p className='text-center text-xs text-white'>Cat Health Detection System</p>
                <figure className='flex items-center justify-center'>
                    <LottiePlayer src="/animations/logo-shining.lottie" />
                </figure>
                <p className='text-center text-xs text-white'>
                    v.{import.meta.env.VITE_APP_VERSION}
                </p>
            </div>
        </main>
    )
}

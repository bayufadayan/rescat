import React from 'react';
import Topbar from '@/components/main/topbar/topbar';
import HeroSection from '@/components/section/hero/hero';

export default function MainPage() {
    return (
        <main className='min-h-svh h-full flex flex-col  relative'>
            <nav className='w-full fixed p-4 z-50'>
                <Topbar />
            </nav>
            <HeroSection />            
        </main>

    )
}

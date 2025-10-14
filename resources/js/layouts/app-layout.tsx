import React from 'react';
import Topbar from '@/components/main/topbar/topbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='min-h-svh h-full flex flex-col relative bg-[#EAF2F9]'>
            <nav className='w-full fixed p-4 z-50'>
                <Topbar />
            </nav>
            {children}
        </main>
    )
}

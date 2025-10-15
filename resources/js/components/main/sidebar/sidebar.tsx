'use client';
import { useSidebar } from '@/contexts/SidebarContext';
import { useEffect } from 'react';
import BottomSection from './bottom-section';
import SidebarHeader from './header';
import Navigation from './navigation';
import ProfileCard from './profile-card';

export default function Sidebar() {
    const { isOpen, closeSidebar } = useSidebar();

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') closeSidebar();
        }
        if (isOpen) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, closeSidebar]);

    return (
        <>
            <div
                onClick={closeSidebar}
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isOpen
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0'
                    }`}
            />

            <aside
                className={`fixed top-0 left-0 z-50 flex h-screen w-72 transform flex-col justify-between bg-white pb-8 shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex w-full flex-col gap-2">
                    <header className="relative flex w-full flex-col gap-4 bg-[linear-gradient(to_bottom,_#0091F3,_#21A6FF)] px-3 pt-8 pb-5">
                        <SidebarHeader />
                        <ProfileCard />
                    </header>

                    <Navigation />
                </div>

                <BottomSection />
            </aside>
        </>
    );
}

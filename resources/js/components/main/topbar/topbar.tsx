import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { useSidebar } from "@/contexts/SidebarContext";
import { useRoute } from 'ziggy-js';

export default function Topbar() {
    const route = useRoute();
    const { toggleSidebar } = useSidebar();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <nav
            className={`w-full fixed top-0 left-0 p-4 z-50 transition-all duration-1000 ease-in-out
                ${scrolled ? 'backdrop-blur-md shadow-md' : 'bg-transparent shadow-none backdrop-blur-none'}
            `}
        >
            <div className='flex flex-row justify-between w-full h-12 items-center'>
                <button onClick={toggleSidebar} className="w-10 h-full">
                    <figure className='flex justify-center items-center'>
                        <img src="/images/icon/sidebar-outline.svg" alt="ResCat" className="h-full w-auto object-contain" />
                    </figure>
                </button>

                <Link href={route('home')}>
                    <figure>
                        <img src="/images/icon/logo-rescat.svg" alt="ResCat" className="h-full w-auto object-contain" />
                    </figure>
                </Link>

                <button className='w-10 h-full'>
                    <figure>
                        <img src="/images/icon/premium-button.svg" alt="ResCat" className="h-full w-auto object-contain" />
                    </figure>
                </button>
            </div>
        </nav>
    )
}

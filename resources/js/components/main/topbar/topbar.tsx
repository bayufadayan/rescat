import { Link } from '@inertiajs/react';
import React from 'react';
import { useSidebar } from "@/contexts/SidebarContext";

export default function Topbar() {
    const { toggleSidebar } = useSidebar();

    return (
        <div className='flex flex-row justify-between w-full h-12 items-center'>
            <button onClick={toggleSidebar} className="w-10 h-full">
                <figure className='flex justify-center items-center'>
                    <img src="/images/icon/sidebar-outline.svg" alt="ResCat" className="h-full w-auto object-contain" />
                </figure>
            </button>

            <Link href={"/"}>
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
    )
}

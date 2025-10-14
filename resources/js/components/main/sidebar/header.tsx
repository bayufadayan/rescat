import React from 'react';
import { useSidebar } from "@/contexts/SidebarContext";

export default function SidebarHeader() {
    const { closeSidebar } = useSidebar();

    return (
        <div className='flex w-full justify-between items-center'>
            <figure>
                <img src="/images/icon/logo-rescat.svg" alt="Logo Rescat" />
            </figure>

            <button onClick={closeSidebar} className="w-10 h-full">
                <figure className='flex justify-center items-center'>
                    <img src="/images/icon/sidebar-duotone.svg" alt="ResCat" className="h-full w-auto object-contain" />
                </figure>
            </button>
        </div>
    )
}

import React from 'react';
import { Link } from '@inertiajs/react';

export default function BigCard() {
    const data = {
        icon: "/images/icon/camera.svg",
        title: "Scan Foto Kucing",
        description: "Periksa foto kucing anda sekarang dengan teknologi AI yang terpercaya.",
        href: "/scan-options",
    }

    return (
        <div
            className="flex-1 rounded-lg p-4 text-white flex flex-col justify-between z-10 overflow-hidden relative"
            style={{
                background: "rgba(255, 255, 255, 0)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px) saturate(150%)",
                WebkitBackdropFilter: "blur(12px) saturate(150%)",
                backgroundClip: "padding-box",
                WebkitBackgroundClip: "padding-box",
            }}
        >
            <div
                className="absolute left-[0px] bottom-[90px] w-full h-full rounded-full pointer-events-none -z-10"
                style={{
                    background: "rgba(168, 85, 247, 0.6)",
                    filter: "blur(80px)",
                }}
            />
            <div className="absolute w-full h-full bg-[url('/images/background/big-card-pattern.png')] -z-10 bg-cover bg-center bg-no-repeat inset-0 opacity-25" />
            <div className='flex flex-col gap-1'>
                <figure className="w-12 h-12 shrink-0 bg-white rounded-full flex justify-center items-center">
                    <img src={data.icon} alt={`${data.title} icon`} className='w-6 h-6' />
                </figure>
                <h2 className="text-2xl font-semibold">{data.title}</h2>
                <p className="text-xs text-white/80 mt-1">
                    {data.description}
                </p>
            </div>

            <Link
                href={data.href}
                className="mt-4 inline-flex items-center justify-center px-6 py-1.5 rounded-full border border-white bg-white/10 text-white font-semibold backdrop-blur-md"
                style={{
                    boxShadow:
                        "-2px -2px 10px 0 rgba(255, 255, 255, 0.25) inset, 2px 2px 10px 0 rgba(255, 255, 255, 0.25) inset",
                }}
            >
                Try Now
            </Link>
        </div>
    )
}

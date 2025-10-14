import { Link } from '@inertiajs/react'
import React from 'react'

interface SmallCardProps {
    icon: string,
    title: string,
    description: string,
    href: string,
}

export default function SmallCard({ icon, title, description, href }: SmallCardProps) {
    return (
        <div
            className="flex-1 rounded-lg p-4 text-white flex flex-col justify-between gap-1 relative overflow-hidden z-10"
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
                className="absolute left-[30px] bottom-[20px] w-full h-full rounded-full pointer-events-none -z-10"
                style={{
                    background: "rgba(30, 255, 0, 0.75)",
                    filter: "blur(80px)",
                }}
            />
            <figure className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                <img src={icon} alt={`${title} icon`} className='w-6 h-6' />
            </figure>
            <h2 className="text-lg font-semibold">{title}</h2>
            <Link href={href} className='flex justify-between items-center'>
                <p className="text-xs text-white/80 flex w-[85%]">{description}</p>
                <img src="/images/icon/arrow.svg" alt="Arrow" />
            </Link>
        </div>
    )
}

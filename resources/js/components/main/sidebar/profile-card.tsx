import { Link } from '@inertiajs/react'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import AvatarRandomProfile from '@/components/main/avatar-random/avatar-random-profile';

export default function ProfileCard() {
    return (
        <div
            className='flex flex-col rounded-xl overflow-hidden'
            style={{
                background: "rgba(255, 255, 255, 0)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px) saturate(150%)",
                WebkitBackdropFilter: "blur(12px) saturate(150%)",
                backgroundClip: "padding-box",
                WebkitBackgroundClip: "padding-box",
            }}>
            <div className='flex gap-2 p-4 bg-transparent relative'>
                <div className="absolute w-full h-full bg-[url('/images/background/profile-card-bg.png')] bg-cover bg-center bg-no-repeat inset-0 -z-10 opacity-40" />
                <figure className='w-14 h-14 shrink-0 grow-0 rounded-full overflow-hidden bg-white'>
                    <AvatarRandomProfile size={56} />
                </figure>

                <div className='flex flex-1 flex-col justify-center gap-1'>
                    <h4 className='font-semibold text-white truncate w-42'>Muhamad Bayu Fadayan yandsadj djshdjsadh jh</h4>
                    <p className='!text-[10px] bg-white text-black px-2 rounded-full w-fit'>0 Cat Profile</p>
                </div>
            </div>

            <div className='text-xs w-full justify-between text-white flex items-center px-4 py-2 bg-white/10'>
                <p className='flex'>You're not logged in</p>

                <Link href={"/login"} className='flex gap-1'>
                    <p>Login</p>
                    <ChevronRight size={16} />
                </Link>
            </div>
        </div>
    )
}

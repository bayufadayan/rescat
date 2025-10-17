import React, { useState } from 'react';
import { Flashlight, FlashlightOff, ChevronDown } from 'lucide-react';
import ScantypePicker from './scan-type-picker';

export default function Header() {
    const [isFLashlightOn, setIsFlashlightOn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleFlashlight = () => {
        setIsFlashlightOn(!isFLashlightOn);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <div className="pointer-events-auto absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-1 mt-2">
            <button className='p-2 hover:bg-neutral-300/50 rounded-full active:scale-95 transition-all duration-300 ease-in-out' onClick={toggleFlashlight}>
                <figure className='shrink-0 grow-0 flex'>
                    {
                        isFLashlightOn ? (
                            <FlashlightOff size={28} />
                        ) : (
                            <Flashlight size={28} />
                        )
                    }
                </figure>
            </button>

            <div className='bg-neutral-900 px-4 py-2 rounded-full flex gap-2 justify-center items-center shadow-md relative' onClick={toggleDropdown}>
                <figure className='w-5 h-5 shrink-0 grow-0'>
                    <img src="/images/icon/face-only-icon-selected.svg" alt="icon" className='w-full h-full' />
                </figure>

                <ChevronDown size={20} className={`opacity-70 transition-all duration-300 ease-in-out ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />

                {isDropdownOpen && (
                    <div className='absolute top-12'>
                        <ScantypePicker />
                    </div>
                )}
            </div>

            <div className="w-10 py-auto invisible"></div>
        </div>
    )
}

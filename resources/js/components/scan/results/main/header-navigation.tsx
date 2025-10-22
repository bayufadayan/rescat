import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeaderNavigation() {
    const buttonClass =
        'w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-200 hover:bg-neutral-200 transition-all shadow-sm active:scale-95';
    const iconClass = 'w-6 h-6 text-black';

    return (
        <div className="bg-white rounded-3xl shadow-xl h-15 w-full relative translate-y-1/2 text-black overflow-hidden flex justify-between items-center px-3 py-2">
            <button className={buttonClass}>
                <ChevronLeft className={iconClass} />
            </button>

            <h3 className="text-base font-semibold tracking-wide select-none">
                Summary
            </h3>

            <button className={buttonClass}>
                <ChevronRight className={iconClass} />
            </button>
        </div>
    );
}

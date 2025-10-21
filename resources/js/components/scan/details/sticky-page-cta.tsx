import React from "react";

interface StickyPageCTAProps {
    onClick: () => void
    className?: string
}

export default function StickyPageCTA({ onClick, className }: StickyPageCTAProps) {

    return (
        <div className={`pointer-events-none fixed bottom-8 left-0 right-0 z-50 flex items-center justify-center ${className}`}>
            <div className="pointer-events-auto w-full max-w-[480px] px-4">
                <button onClick={onClick} className="w-full rounded-2xl bg-sky-600 py-3.5 text-white shadow-lg shadow-sky-600/30 active:scale-[0.98]">
                    Isi Data
                </button>
            </div>
        </div>
    );
}

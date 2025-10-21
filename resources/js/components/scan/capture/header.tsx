import React, { useRef, useState } from 'react';
import { Zap, ZapOff, ChevronDown } from 'lucide-react';
import ScantypePicker from './scan-type-picker';

type ScanTarget = 'fullbody' | 'faceonly';
type ScanMode = 'quick' | 'detail';

export default function Header() {
    const [isFlashlightOn, setIsFlashlightOn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [scan, setScan] = useState<{ target: ScanTarget; mode: ScanMode }>({
        target: 'faceonly',
        mode: 'quick',
    });

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleFlashlight = () => setIsFlashlightOn(v => !v);
    const toggleDropdown = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsDropdownOpen(v => !v);
    };

    const handleScanChange = (v: { target: 'fullbody' | 'faceonly'; mode: 'quick' | 'detail' }) => {
        setScan(v);
    };

    return (
        <div className="pointer-events-auto absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-1 mt-2">
            <button className="p-2 rounded-full" onClick={toggleFlashlight}>
                {isFlashlightOn ? <ZapOff size={28} /> : <Zap  size={28} />}
            </button>

            <div
                ref={dropdownRef}
                className="bg-neutral-900 px-4 py-2 rounded-full flex gap-2 items-center shadow-md relative"
                aria-label="Toggle scan options"
                aria-expanded={isDropdownOpen}
                onClick={(e) => {
                    e.stopPropagation()
                    toggleDropdown()
                }}
            >
                <figure className="w-5 h-5">
                    <img src="/images/icon/face-only-icon-selected.svg" alt="icon" className="w-full h-full" />
                </figure>

                <ChevronDown size={20} className={`opacity-70 transition-all duration-300 ease-in-out ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>

            <div
                className={`fixed inset-0 z-10 transition-opacity duration-150 ${isDropdownOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsDropdownOpen(false)}
            >
                <div
                    className={`absolute top-16 left-1/2 -translate-x-1/2 transition duration-150 transform ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ScantypePicker value={scan} onChange={handleScanChange} />
                </div>
            </div>

            <div className="w-10 invisible" />
        </div>
    );
}

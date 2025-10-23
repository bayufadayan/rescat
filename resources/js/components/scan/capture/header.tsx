import React, { useEffect, useRef, useState } from 'react';
import { Zap, ZapOff, ChevronDown } from 'lucide-react';
import ScantypePicker from './scan-type-picker';
import RestrictionModal from '@/components/scan/options/restriction-modal';

type ScanTarget = 'fullbody' | 'faceonly';
type ScanMode = 'quick' | 'detail';

function mapOptionToTarget(v: string | null): ScanTarget {
    if (v === 'full') return 'fullbody';
    return 'faceonly';
}

function mapTypeToMode(v: string | null): ScanMode {
    return v === 'detail' ? 'detail' : 'quick';
}

type Props = {
    showFlashlight: boolean;
    isFlashlightOn: boolean;
    onToggleFlashlight: () => void;
};

export default function Header({ showFlashlight, isFlashlightOn, onToggleFlashlight }: Props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [scan, setScan] = useState<{ target: ScanTarget; mode: ScanMode }>({ target: 'faceonly', mode: 'quick' });
    const [restrictOpen, setRestrictOpen] = useState(false);
    const [restrictReason, setRestrictReason] = useState<'full' | 'face-detail' | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const opt = typeof window !== 'undefined' ? window.localStorage.getItem('scanOption') : null;
        const typ = typeof window !== 'undefined' ? window.localStorage.getItem('scanType') : null;
        const init = { target: mapOptionToTarget(opt), mode: mapTypeToMode(typ) };
        if (init.target === 'fullbody') {
            setScan({ target: 'faceonly', mode: 'quick' });
        } else if (init.target === 'faceonly' && init.mode === 'detail') {
            setScan({ target: 'faceonly', mode: 'quick' });
        } else {
            setScan(init);
        }
    }, []);

    const toggleDropdown = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsDropdownOpen(v => !v);
    };

    const handleScanChange = (v: { target: 'fullbody' | 'faceonly'; mode: 'quick' | 'detail' }) => {
        if (v.target === 'fullbody') {
            setRestrictReason('full');
            setRestrictOpen(true);
            return;
        }
        if (v.target === 'faceonly' && v.mode === 'detail') {
            setRestrictReason('face-detail');
            setRestrictOpen(true);
            return;
        }
        setScan(v);
        setIsDropdownOpen(false);
    };

    const iconSrc = scan.target === 'faceonly'
        ? '/images/icon/face-only-icon-selected.svg'
        : '/images/icon/full-body-icon-selected.svg';

    return (
        <>
            <div className="text-white pointer-events-auto w-full flex items-center justify-between px-4 py-1 mt-2 max-w-md">
                {showFlashlight ? (
                    <button className="p-2 rounded-full" onClick={onToggleFlashlight}>
                        {isFlashlightOn ? <ZapOff size={28} /> : <Zap size={28} />}
                    </button>
                ) : (
                    <div className="w-10" />
                )}

                <div
                    ref={dropdownRef}
                    className="bg-neutral-900 px-4 py-2 rounded-full flex gap-2 items-center shadow-md relative"
                    aria-label="Toggle scan options"
                    aria-expanded={isDropdownOpen}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown();
                    }}
                >
                    <figure className="w-5 h-5">
                        <img src={iconSrc} alt={scan.target === 'faceonly' ? 'Face only' : 'Full body'} className="w-full h-full" />
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

            <RestrictionModal
                open={restrictOpen}
                onClose={() => setRestrictOpen(false)}
                title={restrictReason === 'full' ? 'Full Body belum tersedia' : 'Detail Scan untuk Face belum tersedia'}
                description={restrictReason === 'full' ? 'Fitur Full Body masih dalam pengembangan. Silakan gunakan Face only terlebih dahulu.' : 'Mode Detail untuk Face masih dalam pengembangan. Silakan pilih Quick scan.'}
                primaryText="Mengerti"
                onPrimary={() => setRestrictOpen(false)}
            />
        </>
    );
}

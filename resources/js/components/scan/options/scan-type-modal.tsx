import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export type ScanType = 'quick' | 'detail';

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm: (t: ScanType) => void;
    defaultValue?: ScanType | null;
};

const CARD_BASE =
    'relative flex-1 min-w-[120px] rounded-xl border transition-all duration-200 p-4 flex flex-col items-center justify-center cursor-pointer select-none aspect-square';
const CARD_UNSELECTED =
    'bg-neutral-50 border-neutral-200 hover:scale-[1.01] active:scale-[0.99]';
const CARD_SELECTED =
    'text-white shadow-lg';

function TypeCard({
    label,
    selected,
    onClick,
    icon,
    selectedIcon,
    textColor,
    textColorSelected = 'text-white',
    backgroundColor = 'bg-black',
}: {
    label: string;
    selected: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    selectedIcon: React.ReactNode;
    textColor?: string;
    textColorSelected?: string;
    backgroundColor?: string;
}) {
    return (
        <div
            className={[CARD_BASE, selected ? [CARD_SELECTED, backgroundColor].join(" ") : CARD_UNSELECTED].join(' ')}
            onClick={onClick}
            role="radio"
            aria-checked={selected}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            {/* checklist pojok kanan */}
            {selected && (
                <span className="absolute top-2 right-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-black">
                    <Check size={16}/>
                </span>
            )}
            <div className="mb-2">{selected ? selectedIcon : icon}</div>
            <span className={`text-sm font-medium ${selected ? textColorSelected : textColor}`}>{label}</span>
        </div>
    );
}

export default function ScanTypeModal({
    open,
    onClose,
    onConfirm,
    defaultValue = null,
}: Props) {
    const [value, setValue] = useState<ScanType | null>(defaultValue ?? null);

    const panelRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!open) return;
        setValue(defaultValue ?? null);
        const timer = setTimeout(() => {
            panelRef.current?.focus();
        }, 0);

        const onEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onEsc);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('keydown', onEsc);
        };

    }, [defaultValue, onClose, open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            aria-modal="true"
            role="dialog"
            aria-labelledby="scan-type-title"
        >
            {/* overlay with backdrop blur */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* modal panel */}
            <div
                ref={panelRef}
                tabIndex={-1}
                className="relative z-[101] w-full max-w-md rounded-2xl bg-white shadow-xl outline-none"
            >
                <div className="p-5">
                    <h3 id="scan-type-title" className="text-lg font-semibold mb-1">
                        Pilih tipe scan
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4">
                        Tentukan tingkat pemeriksaan yang ingin kamu gunakan.
                    </p>

                    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Scan type">
                        <TypeCard
                            label="Quick scan"
                            selected={value === 'quick'}
                            onClick={() => setValue('quick')}
                            icon={<img src="/images/icon/bolt-icon-gradient.svg" alt="Quick scan" className="h-20 w-20" />}
                            selectedIcon={<img src="/images/icon/bolt-icon.svg" alt="Quick scan" className="h-20 w-20" />}
                            textColor='bg-gradient-to-tr from-[#FACC15] via-[#FB923C] to-[#D97706] bg-clip-text text-transparent'
                            backgroundColor='bg-gradient-to-tr from-[#FACC15] via-[#FB923C] to-[#D97706]'
                        />
                        <TypeCard
                            label="Detail scan"
                            selected={value === 'detail'}
                            onClick={() => setValue('detail')}
                            icon={<img src="/images/icon/layer-icon-gradient.svg" alt="Detail scan" className="h-20 w-20" />}
                            selectedIcon={<img src="/images/icon/layer-icon.svg" alt="Detail scan" className="h-20 w-20" />}
                            textColor='bg-gradient-to-tr from-[#2DD4BF] via-[#22C55E] to-[#059669] bg-clip-text text-transparent'
                            backgroundColor='bg-gradient-to-tr from-[#2DD4BF] via-[#22C55E] to-[#059669]'
                        />
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            className="border border-neutral-200"
                            onClick={onClose}
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            className={`cursor-pointer active:scale-95 transition-all duration-300 ease-in-out hover:opacity-80 ${value ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'}`}
                            onClick={() => value && onConfirm(value)}
                            disabled={!value}
                        >
                            Oke
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

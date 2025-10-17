import React, { useState } from 'react';

type ScanTarget = 'fullbody' | 'faceonly';
type ScanMode = 'quick' | 'detail';

type ScantypePickerProps = {
    defaultTarget?: ScanTarget;
    defaultMode?: ScanMode;
    onChange?: (sel: { target: ScanTarget; mode: ScanMode }) => void;
    className?: string;
};

const CheckIcon = ({ className = '' }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={className}
    >
        <path d="M20 7L9.5 17.5 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function ScantypePicker({
    defaultTarget = 'faceonly',
    defaultMode = 'quick',
    onChange,
    className = '',
}: ScantypePickerProps) {
    const [target, setTarget] = useState<ScanTarget>(defaultTarget);
    const [mode, setMode] = useState<ScanMode>(defaultMode);

    const handleTarget = (t: ScanTarget) => {
        setTarget(t);
        onChange?.({ target: t, mode });
    };

    const handleMode = (m: ScanMode) => {
        setMode(m);
        onChange?.({ target, mode: m });
    };

    const icons = {
        faceonly: {
            idle: '/images/icon/face-only-icon.svg',
            selected: '/images/icon/face-only-icon-selected.svg',
            label: 'Face Only',
        },
        fullbody: {
            idle: '/images/icon/full-body-icon.svg',
            selected: '/images/icon/full-body-icon-selected.svg',
            label: 'Full Body',
        },
    } as const;

    return (
        <div
            className={[
                // darker container
                'w-[300px] md:w-[400px] rounded-2xl p-3 md:p-4',
                'bg-neutral-950/70 backdrop-blur border border-white/10 shadow-sm',
                'text-white flex flex-col',
                className,
            ].join(' ')}
        >
            {/* Scan Target */}
            <div className="space-y-2">
                <p className="text-xs md:text-sm font-medium text-neutral-300">Scan Target</p>
                <div className="grid grid-cols-2 gap-3">
                    {(['faceonly', 'fullbody'] as ScanTarget[]).map((key) => {
                        const selected = target === key;
                        const data = icons[key];
                        return (
                            <button
                                key={key}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => handleTarget(key)}
                                className={[
                                    'relative aspect-square w-full rounded-2xl flex items-center justify-center',
                                    'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-400/60',
                                    'ring-1 ring-inset',
                                    selected
                                        ? 'bg-neutral-900 ring-neutral-800'
                                        : 'bg-neutral-900/60 ring-neutral-800/60 hover:bg-neutral-900/80',
                                ].join(' ')}
                            >
                                {/* check circle (top-right) when selected */}
                                {selected && (
                                    <span
                                        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-emerald-500 text-white
                               grid place-items-center shadow ring-1 ring-white/60"
                                        aria-hidden="true"
                                    >
                                        <CheckIcon className="h-4 w-4" />
                                    </span>
                                )}

                                <img
                                    src={selected ? data.selected : data.idle}
                                    alt={data.label}
                                    className="h-12 w-12 md:h-14 md:w-14 select-none pointer-events-none"
                                    draggable={false}
                                />
                                <span
                                    className={[
                                        'absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] md:text-xs font-medium',
                                        selected ? 'text-white' : 'text-neutral-300',
                                    ].join(' ')}
                                >
                                    {data.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Divider */}
            <div className="my-3 md:my-4 h-px bg-white/10" />

            {/* Scan Type */}
            <div className="space-y-2">
                <p className="text-xs md:text-sm font-medium text-neutral-300">Scan Type</p>
                <div className="flex items-center gap-2">
                    {(['quick', 'detail'] as ScanMode[]).map((m) => {
                        const selected = mode === m;
                        return (
                            <button
                                key={m}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => handleMode(m)}
                                className={[
                                    'px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium',
                                    'ring-1 ring-inset transition-colors duration-200 flex items-center gap-2',
                                    selected
                                        ? 'bg-neutral-900 text-white ring-neutral-800'
                                        : 'bg-neutral-900/50 text-neutral-300 ring-neutral-800/60 hover:bg-neutral-900/70',
                                    'focus:outline-none focus:ring-2 focus:ring-neutral-400/60',
                                ].join(' ')}
                            >
                                {/* left-aligned check for the selected pill */}
                                {selected && (
                                    <span
                                        className="inline-grid place-items-center h-4 w-4 rounded-full bg-emerald-500 text-white
                               ring-1 ring-white/60"
                                        aria-hidden="true"
                                    >
                                        <CheckIcon className="h-3 w-3" />
                                    </span>
                                )}
                                {m === 'quick' ? 'Quick Scan' : 'Detail Scan'}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

import React from 'react';

export type OptionValue = 'face' | 'full';

export interface OptionItem {
    value: OptionValue;
    title: string;
    desc: string;
    icon: string;
    selectedIcon: string;
}

const GLASS_BASE = 'w-full max-w-lg flex p-4 rounded-2xl gap-3 md:gap-4 z-20 items-center transition-all duration-200 select-none';
const GLASS_BG = 'bg-white/20 border border-white/60 backdrop-blur-[12px] saturate-[1.5] [background-clip:padding-box]';
const SELECTED_BG = 'bg-white text-black shadow-lg shadow-black/10 ring-2 ring-white/70';
const UNSELECTED_TEXT = 'text-white';
const HOVER_FOCUS = 'hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70';

type Props = {
    option: OptionItem;
    selected: boolean;
    onSelect: (v: OptionValue) => void;
    tabIndex?: number;
    selectedTypeLabel?: 'Quick scan' | 'Detail scan' | null;
};

export default function OptionCard({
    option,
    selected,
    onSelect,
    tabIndex = 0,
    selectedTypeLabel = null,
}: Props) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(option.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(option.value);
                }
            }}
            tabIndex={tabIndex}
            className={[
                GLASS_BASE,
                selected ? SELECTED_BG : `${GLASS_BG} ${UNSELECTED_TEXT}`,
                HOVER_FOCUS,
            ].join(' ')}
        >
            <div className="flex flex-1 flex-col gap-1.5 text-left">
                <div className="flex flex-col items-start gap-1 flex-wrap justify-start">
                    <div className="flex gap-2 items-center">
                        <h2 className="text-xl md:text-2xl font-semibold">{option.title}</h2>
                        {selected && (
                            <span
                                aria-hidden
                                className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-black/90 text-white text-[10px]"
                                title="Selected"
                            >
                                ✓
                            </span>
                        )}
                    </div>
                    {selected && (
                        <span
                            className={[
                                'inline-flex items-center gap-2 text-xs px-2 py-0.5 rounded-full border whitespace-nowrap max-w-[220px] truncate',
                                selectedTypeLabel
                                    ? 'bg-black/10 text-black border-black/20'
                                    : 'bg-amber-50 text-amber-900 border-amber-200',
                            ].join(' ')}
                            title={selectedTypeLabel ?? 'Tipe scan belum dipilih'}
                        >
                            {selectedTypeLabel ? (
                                <svg
                                    className="w-3 h-3 flex-shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            ) : (
                                <svg
                                    className="w-3 h-3 flex-shrink-0"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4a1 1 0 112 0v1a1 1 0 11-2 0v-1zm1-8a1 1 0 00-.993.883L9 7v4a1 1 0 001.993.117L11 11V7a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                            {selectedTypeLabel ?? 'Tipe scan belum dipilih'}
                        </span>
                    )}
                </div>
                <p className="text-sm opacity-90">{option.desc}</p>
            </div>

            <figure
                className={[
                    'w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 grow-0 p-5 md:p-6 transition-colors',
                    selected ? 'bg-[#0091F3]' : 'bg-white',
                ].join(' ')}
            >
                <img
                    src={selected ? option.selectedIcon : option.icon}
                    alt={`${option.title} icon`}
                    className="w-full h-full object-center object-contain fill-amber-400"
                    draggable={false}
                />
            </figure>
        </button >
    );
}

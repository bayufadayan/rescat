import React from 'react';

export type OptionValue = 'face' | 'full';

export interface OptionItem {
    value: OptionValue;
    title: string;
    desc: string;
    icon: string;
}

const GLASS_BASE =
    'w-full max-w-lg flex p-4 rounded-2xl gap-3 md:gap-4 z-20 items-center transition-all duration-200 select-none';
const GLASS_BG =
    'bg-white/20 border border-white/60 backdrop-blur-[12px] saturate-[1.5] [background-clip:padding-box]';
const SELECTED_BG =
    'bg-white text-black shadow-lg shadow-black/10 ring-2 ring-white/70';
const UNSELECTED_TEXT = 'text-white';
const HOVER_FOCUS =
    'hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70';

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
                <div className="flex items-center gap-2 flex-wrap">
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
                    {selectedTypeLabel && (
                        <span
                            className={[
                                'ml-auto text-xs px-2 py-0.5 rounded-full border',
                                selected ? 'bg-black/10 text-black border-black/20' : 'bg-white/20 text-white border-white/40',
                            ].join(' ')}
                        >
                            {selectedTypeLabel}
                        </span>
                    )}
                </div>
                <p className="text-sm opacity-90">{option.desc}</p>
            </div>

            <figure
                className={[
                    'w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 grow-0 p-5 md:p-6 transition-colors',
                    selected ? 'bg-black/5' : 'bg-white',
                ].join(' ')}
            >
                <img
                    src={option.icon}
                    alt={`${option.title} icon`}
                    className="w-full h-full object-center object-contain"
                    draggable={false}
                />
            </figure>
        </button>
    );
}

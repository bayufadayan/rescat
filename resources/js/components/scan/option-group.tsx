import React, { useCallback } from 'react';
import OptionCard, { OptionItem, OptionValue } from './option-card';

type Props = {
    options: OptionItem[];
    value: OptionValue | null;
    onChange: (v: OptionValue) => void;
    ariaLabel?: string;
    selectedTypeLabel?: 'Quick scan' | 'Detail scan' | null;
};

export default function OptionGroup({
    options,
    value,
    onChange,
    ariaLabel = 'Check-up type selection',
    selectedTypeLabel = null,
}: Props) {
    const handleKeyNav = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
            e.preventDefault();
            const order = options.map((o) => o.value);
            const idx = value ? order.indexOf(value) : -1;
            const next =
                e.key === 'ArrowDown'
                    ? order[(idx + 1 + order.length) % order.length]
                    : order[(idx - 1 + order.length) % order.length];
            onChange(next);
        },
        [options, value, onChange]
    );

    return (
        <div
            role="radiogroup"
            aria-label={ariaLabel}
            onKeyDown={handleKeyNav}
            className="flex flex-col gap-3 w-full items-center"
        >
            {options.map((opt, i) => (
                <OptionCard
                    key={opt.value}
                    option={opt}
                    selected={value === opt.value}
                    onSelect={onChange}
                    tabIndex={i === 0 ? 0 : -1}
                    selectedTypeLabel={value === opt.value ? selectedTypeLabel : null}
                />
            ))}
        </div>
    );
}

import React from 'react';

export default function IconPlaceholder({
    children,
    onClick = () => { },
    ariaLabel = 'button',
}: {
    children: React.ReactNode;
    onClick?: () => void;
    ariaLabel?: string;
}) {
    return (
        <button className="rounded-full relative p-2" onClick={onClick} type="button" aria-label={ariaLabel}>
            <figure className="h-5 w-5 flex shrink-0 grow-0 overflow-hidden">
                {children}
            </figure>
        </button>
    );
}
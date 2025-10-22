import React from 'react';

export default function IconPlaceholder({
    children,
    onClick = () => { },
}: {
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button className="rounded-full relative p-2" onClick={onClick}>
            <figure className="h-5 w-5 flex shrink-0 grow-0 overflow-hidden">
                {children}
            </figure>
        </button>
    );
}
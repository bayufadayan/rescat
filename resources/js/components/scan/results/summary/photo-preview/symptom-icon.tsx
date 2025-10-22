import React from 'react'

export default function SymptomIcon({
    children,
    onClick = () => { },
}: {
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button onClick={onClick} className='bg-white border border-black aspect-square rounded-full p-1'>
            <figure className='w-12 h-12 shrink-0 grow-0 flex'>
                {children}
            </figure>
        </button>
    )
}

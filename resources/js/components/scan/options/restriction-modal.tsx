import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
    primaryText?: string;
    onPrimary?: () => void;
};

export default function RestrictionModal({ open, onClose, title, description, primaryText = 'OK', onPrimary }: Props) {
    const panelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const t = setTimeout(() => panelRef.current?.focus(), 0);
        const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onEsc);
        return () => { clearTimeout(t); document.removeEventListener('keydown', onEsc); };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-labelledby="restriction-title">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div ref={panelRef} tabIndex={-1} className="relative z-[121] w-full max-w-md rounded-2xl bg-white shadow-xl outline-none">
                <div className="p-5">
                    <h3 id="restriction-title" className="text-lg font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-neutral-600 mb-4">{description}</p>
                    <div className="mt-2 flex items-center justify-end gap-2">
                        <Button type="button" variant="ghost" className="border border-neutral-200" onClick={onClose}>Tutup</Button>
                        <Button type="button" className="bg-black text-white" onClick={onPrimary ?? onClose}>{primaryText}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

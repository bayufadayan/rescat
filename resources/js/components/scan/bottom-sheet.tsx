import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type BottomSheetProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    contentClassName?: string;
};

export default function BottomSheet({
    open,
    onClose,
    children,
    contentClassName = '',
}: BottomSheetProps) {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        const original = document.body.style.overflow;
        if (open) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    if (!mountedRef.current) return null;
    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                className={[
                    'absolute left-0 right-0 bottom-0',
                    'rounded-t-2xl bg-white shadow-2xl border-t',
                    'animate-[bottomsheet-in_200ms_ease-out]',
                    'px-4 pt-4 pb-6',
                    'sm:max-w-xl sm:left-1/2 sm:-translate-x-1/2',
                    contentClassName,
                ].join(' ')}
            >
                {children}
            </div>

            <style>
                {`
                    @keyframes bottomsheet-in {
                        from { transform: translateY(100%); opacity: 0.5; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}
            </style>
        </div>,
        document.body
    );
}

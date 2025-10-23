import { useEffect, useState } from 'react';

export function useHoverCapability() {
    const [hoverCapable, setHoverCapable] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
        const update = () => setHoverCapable(mq.matches);
        update();
        mq.addEventListener?.('change', update);
        return () => mq.removeEventListener?.('change', update);
    }, []);
    return hoverCapable;
}

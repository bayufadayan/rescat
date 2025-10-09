// resources/js/components/onboarding/indicators.tsx
import * as React from "react";

type Props = {
    total: number;
    current: number; 
    onJump?: (index: number) => void;
};

export default function Indicators({ total, current, onJump }: Props) {
    return (
        <div className="flex items-center gap-2">
            {Array.from({ length: total }).map((_, i) => {
                const active = i === current;
                return (
                    <button
                        key={i}
                        aria-label={`Slide ${i + 1}`}
                        onClick={() => onJump?.(i)}
                        className={[
                            "h-2.5 rounded-full transition-all",
                            active ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70",
                        ].join(" ")}
                    />
                );
            })}
        </div>
    );
}

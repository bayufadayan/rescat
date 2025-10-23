import React from 'react';
import { User, Scan, Zap, Layers } from 'lucide-react';

type Props = {
    target: 'faceonly' | 'fullbody';
    mode: 'quick' | 'detail';
};

const TARGET_LABEL: Record<Props['target'], string> = {
    faceonly: 'Face Only',
    fullbody: 'Full Body',
};

const MODE_LABEL: Record<Props['mode'], string> = {
    quick: 'Quick',
    detail: 'Detail',
};

export default function SelectionSummary({ target, mode }: Props) {
    const TargetIcon = target === 'faceonly' ? User : Scan;
    const ModeIcon = mode === 'quick' ? Zap : Layers;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <span className="text-xs tracking-wide text-white/70">Current Selection</span>
                <span className="text-[10px] uppercase tracking-wider text-white/60">Preset</span>
            </div>

            <div className="mt-2 w-full rounded-2xl bg-gradient-to-r from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.15)] p-3">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-xl bg-white/90 text-neutral-900 flex items-center justify-center shadow-inner">
                            <TargetIcon size={18} />
                        </div>
                        <div>
                            <div className="text-xs text-white/70">Target</div>
                            <div className="text-sm font-semibold text-white">{TARGET_LABEL[target]}</div>
                        </div>
                    </div>

                    <div className="h-8 w-px bg-white/15" />

                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-xl bg-white/90 text-neutral-900 flex items-center justify-center shadow-inner">
                            <ModeIcon size={18} />
                        </div>
                        <div>
                            <div className="text-xs text-white/70">Mode</div>
                            <div className="text-sm font-semibold text-white">{MODE_LABEL[mode]}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white text-neutral-900 px-2.5 py-1 text-[11px] font-semibold shadow-sm">
                        <TargetIcon size={14} />
                        {TARGET_LABEL[target]}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 text-neutral-900 px-2.5 py-1 text-[11px] font-semibold shadow-sm">
                        <ModeIcon size={14} />
                        {MODE_LABEL[mode]}
                    </span>
                </div>
            </div>
        </div>
    );
}

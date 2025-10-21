import React from 'react';
import { Check } from 'lucide-react';

type ScanTarget = 'fullbody' | 'faceonly';
type ScanMode = 'quick' | 'detail';

type Props = {
    value: { target: ScanTarget; mode: ScanMode };
    onChange: (v: { target: ScanTarget; mode: ScanMode }) => void;
    className?: string;
};

export default function ScantypePicker({ value, onChange, className = '' }: Props) {
    const { target, mode } = value;

    return (
        <div
            className={['w-[300px] rounded-2xl p-3 bg-neutral-900/80 backdrop-blur', className].join(' ')}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="mb-3">
                <p className="text-xs text-neutral-300">Scan Target</p>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={() => onChange({ target: 'faceonly', mode })}
                        aria-pressed={target === 'faceonly'}
                        className={`flex flex-col gap-2 justify-center items-center px-3 py-2 rounded-lg flex-1 border-2 relative ${target === 'faceonly' ? 'bg-neutral-800 border-white' : 'bg-neutral-700/50 border-transparent'
                            }`}
                    >
                        <img
                            src="/images/icon/face-only-icon-selected.svg"
                            alt="face-cat-icon"
                            className={`scale-90 -mb-1 object-center object-cover ${target === 'faceonly' ? 'opacity-100' : 'opacity-50'
                                }`}
                        />
                        <span className={`text-sm ${target === 'faceonly' ? 'opacity-100' : 'opacity-50'}`}>
                            Face only check-up
                        </span>
                        {target === 'faceonly' && (
                            <div className="absolute w-4 h-4 flex items-center justify-center bg-white rounded-full top-1.5 right-1.5">
                                <Check className="text-neutral-800" size={12} />
                            </div>
                        )}
                    </button>
                    <button
                        onClick={() => onChange({ target: 'fullbody', mode })}
                        aria-pressed={target === 'fullbody'}
                        className={`flex flex-col gap-2 justify-center items-center px-3 py-2 rounded-lg flex-1 border-2 relative ${target === 'fullbody' ? 'bg-neutral-800 border-white' : 'bg-neutral-700/50 border-transparent'
                            }`}
                    >
                        <img
                            src="/images/icon/full-body-icon-selected.svg"
                            alt="face-cat-icon"
                            className={`scale-90 -mb-1 object-center object-cover ${target === 'fullbody' ? 'opacity-100' : 'opacity-50'
                                }`}
                        />
                        <span className={`text-sm ${target === 'fullbody' ? 'opacity-100' : 'opacity-50'}`}>
                            Full body check-up
                        </span>
                        {target === 'fullbody' && (
                            <div className="absolute w-4 h-4 flex items-center justify-center bg-white rounded-full top-1.5 right-1.5">
                                <Check className="text-neutral-800" size={12} />
                            </div>
                        )}
                    </button>
                </div>
            </div>

            <div>
                <p className="text-xs text-neutral-300">Scan Type</p>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={() => onChange({ target, mode: 'quick' })}
                        aria-pressed={mode === 'quick'}
                        className={` flex justfy-center items-center gap-2 px-3 py-1 rounded-full border ${mode === 'quick' ? 'bg-neutral-800 border-white' : 'bg-neutral-700/50 border-transparent'
                            }`}
                    >
                        {mode === 'quick' && (
                            <div className="w-4 h-4 flex items-center justify-center bg-white rounded-full top-1.5 right-1.5">
                                <Check className="text-neutral-800" size={12} />
                            </div>
                        )}
                        <span className={`${mode === 'quick' ? 'opacity-100' : 'opacity-50'}`}>Quick</span>
                    </button>
                    <button
                        onClick={() => onChange({ target, mode: 'detail' })}
                        aria-pressed={mode === 'detail'}
                        className={` flex justfy-center items-center gap-2 px-3 py-1 rounded-full border ${mode === 'detail' ? 'bg-neutral-800 border-white' : 'bg-neutral-700/50 border-transparent'
                            }`}
                    >
                        {mode === 'detail' && (
                            <div className="w-4 h-4 flex items-center justify-center bg-white rounded-full top-1.5 right-1.5">
                                <Check className="text-neutral-800" size={12} />
                            </div>
                        )}
                        <span className={`${mode === 'detail' ? 'opacity-100' : 'opacity-50'}`}>Detail</span>
                    </button>
                </div>
            </div>

            <div className="h-[1px] w-full rounded-full bg-white mt-5 mb-3 opacity-10"></div>
            <h5 className="flex justify-between mt-2 text-sm font-medium text-gray-300">
                <span>You Choose</span>
                <span>
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                        {target}
                    </span>
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">
                        {mode}
                    </span>
                </span>
            </h5>
        </div>
    );
}

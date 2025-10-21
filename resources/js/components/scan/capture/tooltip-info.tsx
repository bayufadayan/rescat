import React from 'react';
import { Info } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export default function InfoTooltip() {
    return (
        <TooltipProvider delayDuration={150}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        className="absolute right-2 top-2 rounded-full bg-black/30 p-1.5 hover:bg-black/50 transition pointer-events-auto"
                        aria-label="Info"
                    >
                        <Info className="h-5 w-5 text-white/90" />
                    </button>
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    align="end"
                    className="bg-white text-neutral-800 px-3 py-1.5 rounded-lg shadow-lg text-sm font-medium"
                >
                    <p>Aplikasi ini mengikuti protokol yang sangat ketat dalam menilai kondisi kucing, Jika hasil keliru atau tidak sesuai anda dapat membaca panduan ini</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

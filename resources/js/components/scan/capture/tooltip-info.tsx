import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useHoverCapability } from '@/hooks/use-hover-capability';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export default function InfoTooltip() {
    const hoverCapable = useHoverCapability();
    const [open, setOpen] = useState(false);

    if (hoverCapable) {
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
                        className="bg-white text-neutral-800 px-3 py-1.5 rounded-lg shadow-lg text-sm font-medium max-w-xs"
                    >
                        <p>
                            Aplikasi ini mengikuti protokol yang sangat ketat dalam menilai kondisi kucing. Jika hasil keliru atau tidak sesuai Anda dapat membaca
                            <Link href="https://docs.rescat.life" target="_blank" className="text-blue-600 underline ml-1">
                                panduan ini
                            </Link>
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="absolute right-2 top-2 rounded-full bg-black/30 p-1.5 hover:bg-black/50 transition pointer-events-auto"
                    aria-label="Info"
                >
                    <Info className="h-5 w-5 text-white/90" />
                </button>
            </PopoverTrigger>
            <PopoverContent
                side="bottom"
                align="end"
                className="bg-white text-neutral-800 px-3 py-2 rounded-lg shadow-lg text-sm font-medium max-w-xs"
            >
                <p>
                    Aplikasi ini mengikuti protokol yang sangat ketat dalam menilai kondisi kucing. Jika hasil keliru atau tidak sesuai Anda dapat membaca
                    <Link href="https://docs.rescat.life" target="_blank" className="text-blue-600 underline ml-1">
                        panduan ini
                    </Link>
                </p>
            </PopoverContent>
        </Popover>
    );
}

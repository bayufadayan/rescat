// src/components/scan/results/main/quick-actions/contact-modal.tsx
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import { Phone, MessageCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { VetContact } from '@/constants/vet-contacts-data';
import { normalizePhone } from '@/lib/helper/phone';

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    contacts: VetContact[];
};

export default function ContactModal({ open, onOpenChange, contacts }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="z-[120] sm:max-w-[520px] p-0 overflow-hidden">
                <DialogHeader className="px-5 pt-5">
                    <DialogTitle className="text-base font-semibold">Hubungi Dokter Hewan Terdekat</DialogTitle>
                    <DialogDescription className="text-sm">
                        Pilih kontak berikut untuk menelpon langsung atau chat via WhatsApp.
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[65vh] overflow-y-auto px-5 pb-5 pt-2">
                    <TooltipProvider delayDuration={150}>
                        <ul className="space-y-3">
                            {contacts.map((c, idx) => {
                                const p = normalizePhone(c.phone);
                                const telHref = `tel:${p.tel}`;
                                const waHref = `https://wa.me/${p.wa}?text=${encodeURIComponent(
                                    'Halo Dok, saya butuh konsultasi hewan peliharaan.'
                                )}`;

                                return (
                                    <li key={idx} className="rounded-2xl border border-slate-200 p-3.5 bg-white">
                                        <div className="flex items-center justify-between gap-3">
                                            {/* Info lebih lega: flex-1 + min-w-0 + truncate */}
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-slate-900 truncate">{c.name}</p>
                                                <p className="text-xs text-slate-600 truncate">{c.clinic}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{c.phone}</p>
                                            </div>

                                            {/* Icon-only actions */}
                                            <div className="flex items-center gap-2 shrink-0">
                                                {/* Telepon */}
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <a
                                                            href={telHref}
                                                            aria-label={`Telepon ${c.name}`}
                                                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.98]"
                                                        >
                                                            <span className="sr-only">Telepon</span>
                                                            <Phone className="h-4 w-4 text-slate-900" />
                                                        </a>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="bottom" align="center" className="z-[130] text-xs">
                                                        Telepon
                                                    </TooltipContent>
                                                </Tooltip>

                                                {/* WhatsApp */}
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <a
                                                            href={waHref}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            aria-label={`WhatsApp ${c.name}`}
                                                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] hover:opacity-95 active:scale-[0.98]"
                                                        >
                                                            <span className="sr-only">WhatsApp</span>
                                                            <MessageCircle className="h-4 w-4 text-white" />
                                                        </a>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="bottom" align="center" className="z-[130] text-xs">
                                                        WhatsApp
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </TooltipProvider>
                </div>

                <div className="sticky bottom-0 w-full bg-white/95 px-5 pb-5 pt-3 backdrop-blur">
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium hover:bg-slate-50 active:scale-[0.98]"
                        >
                            Tutup
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// src/components/scan/results/main/quick-actions/more-menu.tsx
import React, { useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import MoreButton from './action-more-menu';
import { Share2, MapPin, BookOpen, MessageSquare } from 'lucide-react';
import ShareModal from './share-modal';
import petcares from '@/constants/petcare-data';

function mapsUrl(name: string, address: string, lat?: number, lng?: number) {
    if (typeof lat === 'number' && typeof lng === 'number') {
        return `https://www.google.com/maps?q=${lat},${lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`)}`;
}

export default function MoreMenu() {
    const [open, setOpen] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [showMaps, setShowMaps] = useState(false);

    const currentUrl = useMemo(() => (typeof window !== 'undefined' ? window.location.href : ''), []);

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div>
                        <MoreButton />
                    </div>
                </PopoverTrigger>

                <PopoverContent
                    side="top"
                    align="end"
                    sideOffset={8}
                    className="z-[100] w-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
                >
                    {/* Bar ikon utama */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={async () => {
                                if (navigator.share) {
                                    try {
                                        await navigator.share({ title: 'Hasil pemeriksaan Rescat', url: currentUrl });
                                    } catch {
                                        //
                                    }
                                } else {
                                    setOpen(false);
                                    setOpenShare(true);
                                }
                            }}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.98]"
                            aria-label="Share"
                            title="Share"
                        >
                            <Share2 className="h-5 w-5 text-slate-900" />
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowMaps((v) => !v)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.98]"
                            aria-label="Maps"
                            title="Maps"
                        >
                            <MapPin className="h-5 w-5 text-slate-900" />
                        </button>

                        <a
                            href="https://docs.rescat.life"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.98]"
                            aria-label="Docs"
                            title="Docs"
                        >
                            <BookOpen className="h-5 w-5 text-slate-900" />
                        </a>

                        <a
                            href="/feedback"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.98]"
                            aria-label="Feedback"
                            title="Feedback"
                        >
                            <MessageSquare className="h-5 w-5 text-slate-900" />
                        </a>
                    </div>

                    {/* Panel Maps (toggle dalam popover) */}
                    {showMaps && (
                        <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3">
                            <p className="mb-2 text-sm font-medium text-slate-900">Petcare di sekitar</p>
                            <ul className="max-h-[220px] space-y-2 overflow-y-auto pr-1">
                                {petcares.map((p, i) => {
                                    const href = mapsUrl(p.name, p.address, p.lat, p.lng);
                                    return (
                                        <li key={i} className="rounded-xl border border-slate-200 p-2.5">
                                            <p className="text-sm font-medium text-slate-900 truncate">{p.name}</p>
                                            <p className="text-xs text-slate-600 truncate">{p.address}</p>
                                            {p.phone && <p className="text-xs text-slate-500 mt-0.5">{p.phone}</p>}
                                            <div className="mt-2">
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:brightness-[1.05] active:scale-[0.98]"
                                                >
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    Buka Maps
                                                </a>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </PopoverContent>
            </Popover>

            {/* Modal share (dibuka dari tombol Share di popover) */}
            <ShareModal open={openShare} onOpenChange={setOpenShare} url={currentUrl} title="Hasil pemeriksaan Rescat" />
        </>
    );
}

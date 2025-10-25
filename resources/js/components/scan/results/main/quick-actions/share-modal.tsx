// src/components/scan/results/main/quick-actions/share-modal.tsx
import React from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose,
} from '@/components/ui/dialog';
import {
    WhatsappShareButton, TelegramShareButton, TwitterShareButton, FacebookShareButton, LinkedinShareButton,
    WhatsappIcon, TelegramIcon, TwitterIcon, FacebookIcon, LinkedinIcon,
} from 'react-share';

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    url?: string;
    title?: string;
};

export default function ShareModal({ open, onOpenChange, url, title }: Props) {
    const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '');
    const shareTitle = title ?? 'Cek hasil pemeriksaan hewan peliharaan saya';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="z-[110] sm:max-w-[420px] rounded-2xl p-0 overflow-hidden">
                <DialogHeader className="px-5 pt-5">
                    <DialogTitle className="text-base font-semibold">Bagikan</DialogTitle>
                    <DialogDescription className="text-sm">Pilih platform untuk membagikan tautan ini.</DialogDescription>
                </DialogHeader>

                <div className="px-5 pb-5 pt-3">
                    <div className="grid grid-cols-5 gap-3">
                        <WhatsappShareButton url={shareUrl} title={shareTitle}>
                            <WhatsappIcon size={48} round />
                        </WhatsappShareButton>
                        <TelegramShareButton url={shareUrl} title={shareTitle}>
                            <TelegramIcon size={48} round />
                        </TelegramShareButton>
                        <TwitterShareButton url={shareUrl} title={shareTitle}>
                            <TwitterIcon size={48} round />
                        </TwitterShareButton>
                        <FacebookShareButton url={shareUrl} title={shareTitle}>
                            <FacebookIcon size={48} round />
                        </FacebookShareButton>
                        <LinkedinShareButton url={shareUrl} title={shareTitle}>
                            <LinkedinIcon size={48} round />
                        </LinkedinShareButton>
                    </div>

                    {/* Fallback copy link */}
                    <div className="mt-5 rounded-xl border border-slate-200 p-2.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                            <input
                                readOnly
                                value={shareUrl}
                                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1"
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            <button
                                type="button"
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium hover:bg-slate-50 active:scale-[0.98]"
                                onClick={() => {
                                    navigator.clipboard.writeText(shareUrl);
                                }}
                            >
                                Salin
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-5 pb-5">
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

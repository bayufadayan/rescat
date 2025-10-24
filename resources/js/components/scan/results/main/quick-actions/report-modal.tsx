// src/components/scan/results/main/quick-actions/report-modal.tsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import { BadgeCheck, Hash, FileText, Image as ImageIcon } from 'lucide-react';

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
};

// Dummy payload (hardcoded)
const RESULT = {
    id: 'CHK-2025-001',
    title: 'Hasil Pemeriksaan Wajah',
    score: 87,
    statusLabel: 'Aktif',
    statusTone: 'bg-emerald-100 text-emerald-700',
    photoUrl: '/images/dummy/cat-original.png',
};

export default function ReportModal({ open, onOpenChange }: Props) {
    const [category, setCategory] = useState('kualitas_foto');
    const [reasons, setReasons] = useState<string[]>([]);
    const [notes, setNotes] = useState('');
    const [contact, setContact] = useState('');

    const toggleReason = (val: string) =>
        setReasons((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
        );

    const onSubmit = () => {
        console.log({ id: RESULT.id, category, reasons, notes, contact });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
          z-[120] sm:max-w-[620px]
          bg-white
          p-0
          overflow-hidden
          rounded-2xl
          mt-8 mb-8
          max-h-[calc(100dvh-4rem)]
          flex flex-col
        "
            >
                {/* Header */}
                <DialogHeader className="px-5 pt-5 pb-3 shrink-0">
                    <DialogTitle className="text-base font-semibold">
                        Buat Laporan Pemeriksaan
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Tinjau ringkasan hasil di bawah, lalu jelaskan masalah yang ingin kamu laporkan.
                    </DialogDescription>
                </DialogHeader>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-5 space-y-5 pb-8">
                    {/* Card ringkas */}
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                            <img
                                src={RESULT.photoUrl}
                                alt="Hasil pemeriksaan"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-900">
                                {RESULT.title}
                            </p>
                            <p className="text-xs text-slate-600">
                                Skor:&nbsp;
                                <span className="font-medium text-slate-900">{RESULT.score}</span>
                                <span className="mx-1">•</span>
                                <span
                                    className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${RESULT.statusTone}`}
                                >
                                    {RESULT.statusLabel}
                                </span>
                            </p>
                            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                                <Hash className="h-3.5 w-3.5" />
                                {RESULT.id}
                            </p>
                        </div>
                    </div>

                    {/* Kategori */}
                    <div className="grid gap-1.5">
                        <label className="text-sm font-medium text-slate-800 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Kategori Laporan
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-sky-100 focus:ring-4"
                        >
                            <option value="kualitas_foto">Kualitas foto bermasalah</option>
                            <option value="hasil_tidak_akurat">Hasil tidak akurat</option>
                            <option value="identitas_salah">Identitas/ID salah</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                    </div>

                    {/* Alasan */}
                    <div className="grid gap-1.5">
                        <span className="text-sm font-medium text-slate-800 flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Pilih Alasan (opsional)
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {[
                                ['blur', 'Foto blur'],
                                ['gelap', 'Pencahayaan gelap'],
                                ['framing', 'Framing kurang tepat'],
                                ['misdetect', 'Deteksi salah'],
                                ['server', 'Kesalahan server'],
                            ].map(([val, label]) => (
                                <label
                                    key={val}
                                    className={`cursor-pointer select-none rounded-full border px-3 py-1.5 text-xs ${reasons.includes(val)
                                            ? 'border-sky-300 bg-sky-50 text-sky-700'
                                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={reasons.includes(val)}
                                        onChange={() => toggleReason(val)}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div className="grid gap-1.5">
                        <label className="text-sm font-medium text-slate-800">Deskripsi Laporan</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Jelaskan masalah yang kamu temui…"
                            className="min-h-[110px] rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-sky-100 focus:ring-4"
                        />
                        <p className="text-[11px] text-slate-500">
                            Hindari membagikan informasi sensitif. Tim kami akan meninjau laporan ini.
                        </p>
                    </div>

                    {/* Kontak */}
                    <div className="grid gap-1.5 pb-2">
                        <label className="text-sm font-medium text-slate-800">Kontak (opsional)</label>
                        <input
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Email atau nomor WhatsApp"
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-sky-100 focus:ring-4"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="shrink-0 w-full bg-white/95 px-5 pb-5 pt-3 backdrop-blur">
                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <button
                                type="button"
                                className="w-1/3 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium hover:bg-slate-50 active:scale-[0.98]"
                            >
                                Tutup
                            </button>
                        </DialogClose>

                        <button
                            type="button"
                            onClick={onSubmit}
                            className="w-2/3 inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 hover:brightness-[1.03] active:scale-[0.98]"
                        >
                            <BadgeCheck className="h-4 w-4" />
                            Kirim Laporan
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

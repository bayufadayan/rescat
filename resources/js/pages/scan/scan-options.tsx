import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { useRoute } from 'ziggy-js';
import OptionGroup from '@/components/scan/options/option-group';
import { OptionItem, OptionValue } from '@/components/scan/options/option-card';
import { useLocalStorage } from '@/hooks/use-local-storage';
import ScanTypeModal, { ScanType } from '@/components/scan/options/scan-type-modal';
import BottomSheet from '@/components/scan/options/bottom-sheet';

const OPTIONS: OptionItem[] = [
  {
    value: 'face',
    title: 'Face only check-up',
    desc: 'Scan cepat untuk area wajah. Ideal untuk cek harian & ringkas.',
    icon: '/images/icon/face-only-icon.svg',
    selectedIcon: '/images/icon/face-only-icon-selected.svg',
  },
  {
    value: 'full',
    title: 'Full body check-up',
    desc: 'Pemeriksaan menyeluruh dari ujung kepala hingga kaki.',
    icon: '/images/icon/full-body-icon.svg',
    selectedIcon: '/images/icon/full-body-icon-selected.svg',
  },
];

export default function ScanOptions() {
  const route = useRoute();
  const [committedSelected, setCommittedSelected] = useLocalStorage<OptionValue | null>('scanOption', null);
  const [committedScanType, setCommittedScanType] = useLocalStorage<ScanType | null>('scanType', null);
  const [draftSelected, setDraftSelected] = useState<OptionValue | null>(null);
  const [draftScanType, setDraftScanType] = useState<ScanType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setDraftSelected(committedSelected);
    setDraftScanType(committedScanType);
  }, [committedSelected, committedScanType]);

  const handleSelectOption = (v: OptionValue) => {
    setDraftSelected(v);
    setDraftScanType(null);
    setModalOpen(true);
  };

  const handleConfirmType = (t: ScanType) => {
    setDraftScanType(t);
    setModalOpen(false);
  };

  const handleNext = () => {
    if (!draftSelected || !draftScanType) return;
    setSheetOpen(true);
  };

  const selectedTypeLabel =
    draftScanType === 'quick' ? 'Quick scan' : draftScanType === 'detail' ? 'Detail scan' : null;

  const handleStartScan = () => {
    if (!draftSelected || !draftScanType) return;

    setCommittedSelected(draftSelected);
    setCommittedScanType(draftScanType);

    const url = route('scan.capture');
    window.location.href = url;
  };

  return (
    <AppLayout>
      <main className="min-h-dvh h-dvh flex flex-col items-center justify-between bg-[linear-gradient(to_bottom,_#0091F3,_#21A6FF)] relative">
        <div className="absolute w-full h-full bg-[url('/images/background/pink-purple.png')] bg-cover bg-center bg-no-repeat mix-blend-soft-light" />

        <div className="px-4 flex flex-col pt-22 items-center gap-4 w-full">
          <h1 className="font-semibold text-2xl text-white w-full text-center">
            Choose check-up type do you want to use
          </h1>

          <OptionGroup
            options={OPTIONS}
            value={draftSelected}
            onChange={handleSelectOption}
            ariaLabel="Check-up type selection"
            selectedTypeLabel={selectedTypeLabel}
          />
        </div>

        {/* button */}
        <div className="flex flex-col w-full gap-2 px-4 pb-8 items-center z-10">
          <Button
            type="button"
            className={[
              'w-full py-5 transition-all max-w-lg',
              (draftSelected && draftScanType)
                ? 'bg-white text-black active:scale-95 duration-300 ease-in-out cursor-pointer'
                : 'bg-white/60 text-black/60 cursor-not-allowed backdrop-blur-2xl',
            ].join(' ')}
            onClick={handleNext}
          >
            Oke, lanjut
          </Button>

          <Button
            type="button"
            onClick={() => (window.location.href = route('home'))}
            className="w-full border border-white/50 bg-white/10 text-white py-5 cursor-pointer max-w-lg backdrop-blur-2xl active:scale-95 transition-all duration-300 ease-in-out"
          >
            Back to Home
          </Button>
        </div>
      </main>

      <ScanTypeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmType}
        defaultValue={draftScanType}
      />

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div className="flex h-2 w-[100px] bg-gray-400/80 rounded-full mx-auto mb-3" />
        <h3 className="text-center text-lg font-semibold">Instruksi</h3>
        <p className="sr-only">Ikuti langkah di bawah ini sebelum memulai pemindaian.</p>

        <div className="mt-3">
          <ol className="list-decimal pl-5 space-y-2 text-sm text-neutral-700">
            <li>Pastikan pencahayaan cukup dan area terlihat jelas.</li>
            <li>Posisikan perangkat pada jarak yang nyaman & stabil.</li>
            <li>Hindari gerakan cepat saat pemindaian berlangsung.</li>
            <li>Bersihkan lensa kamera untuk hasil tajam.</li>
            <li>Lepas aksesori yang menutupi area pemindaian.</li>
            <li>Ikuti indikator di layar untuk penyelarasan.</li>
            <li>Tetap tenang dan bernapas normal.</li>
            <li>Pastikan baterai cukup & internet stabil.</li>
            <li>Ulangi pemindaian bila diminta sistem.</li>
            <li>Simpan hasil jika perlu untuk perbandingan.</li>
          </ol>
        </div>

        <div className="mt-5">
          <Button
            type="button"
            onClick={handleStartScan}
            className="w-full py-5 font-semibold bg-[#0091F3] hover:bg-[#0a83da] text-white"
          >
            Start Scan
          </Button>
        </div>
      </BottomSheet>
    </AppLayout>
  );
}

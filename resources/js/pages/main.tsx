import React from 'react';
import AppLayout from '@/layouts/app-layout';
import HeroSection from '@/components/section/hero/hero';
import LastCheck from '@/components/section/last-check/last-check';
import HistoryPreview from '@/components/section/history-preview/history-preview';

export default function MainPage() {
    return (
        <AppLayout>
            <HeroSection />
            <LastCheck />
            <HistoryPreview />
        </AppLayout>
    )
}

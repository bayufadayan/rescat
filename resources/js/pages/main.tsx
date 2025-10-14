import React from 'react';
import AppLayout from '@/layouts/app-layout';
import HeroSection from '@/components/section/hero/hero';
import LastCheck from '@/components/section/last-check/last-check';

export default function MainPage() {
    return (
        <AppLayout>
            <HeroSection />
            <LastCheck />
        </AppLayout>
    )
}

import React from 'react';
import AppLayout from '@/layouts/app-layout';
import ResultHeader from '@/components/scan/results/main/header';
import HeaderNavigation from '@/components/scan/results/main/header-navigation';
import WarningBanner from '@/components/scan/results/main/waning-banner';
import PhotoViewer from '@/components/scan/results/summary/photo-viewer';
import AnalysisResultCard from '@/components/scan/results/summary/analysis-result-card';
import BackToHome from '@/components/scan/results/main/back-to-home-button';
import ThumbTabs from '@/components/scan/results/detail/thumb-tabs';
import MediaInspectionCard from '@/components/scan/results/detail/media-inspection-card';
import AnalysisTile from '@/components/scan/results/detail/analysis-tile';

export default function ScanResults() {
    return (
        <AppLayout>
            <div className='flex flex-col bg-white w-full min-h-screen relative pb-12 gap-4'>
                <div className='flex flex-col w-full relative'>
                    <ResultHeader />
                    <div className="w-full flex justify-center items-center px-4 absolute bottom-0">
                        <HeaderNavigation />
                    </div>
                </div>

                {/* Container Content */}
                <div className='flex flex-col px-4 gap-4'>
                    <WarningBanner />
                    <PhotoViewer />
                    <AnalysisResultCard />
                    <BackToHome />
                </div>

                <div className='text-center bg-red-500 h-1 w-full '>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <ThumbTabs />
                    <div className="px-4 flex flex-col justify-center gap-4 w-full items-center">
                        <MediaInspectionCard />
                        <AnalysisTile />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

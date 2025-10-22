import React from 'react';
import AppLayout from '@/layouts/app-layout';
import ResultHeader from '@/components/scan/results/main/header';
import HeaderNavigation from '@/components/scan/results/main/header-navigation';

export default function ScanResults() {
    return (
        <AppLayout>
            <div className='flex flex-col bg-white w-full min-h-screen relative'>
                <div className='flex flex-col w-full relative'>
                    <ResultHeader />
                    <div className="w-full flex justify-center items-center px-4 absolute bottom-0">
                        <HeaderNavigation />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

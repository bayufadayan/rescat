import React from 'react';
import CallButton from './quick-actions/action-call-button';
import DownloadButton from './quick-actions/action-download-button';
import ReportButton from './quick-actions/action-report-button';
import MoreMenu from './quick-actions/action-more-menu';

export default function QuickActionBar() {
    return (
        <div className='rounded-full bg-white/50 gap-0 p-1 flex justify-center items-center'>
            <div className="bg-white rounded-full gap-2 flex justify-center items-center p-1">
                <ReportButton />
                <CallButton />
                <DownloadButton />
            </div>

            <div className="rounded-full flex !justify-center !items-center p-[1px] relative -ml-0.5">
                <MoreMenu />
            </div>
            
        </div>
    )
}

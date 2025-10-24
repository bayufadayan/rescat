// src/components/scan/results/main/quick-action-bar.tsx
import React, { useState } from 'react';
import CallButton from './quick-actions/action-call-button';
import DownloadButton from './quick-actions/action-download-button';
import ReportButton from './quick-actions/action-report-button';
import MoreMenu from './quick-actions/action-more-menu';
import ContactModal from './quick-actions/contact-modal';
import vetContacts from '@/constants/vet-contacts-data';

export default function QuickActionBar() {
    const [openContacts, setOpenContacts] = useState(false);

    return (
        <>
            <div className="rounded-full bg-white/50 gap-0 p-1 flex justify-center items-center">
                <div className="bg-white rounded-full gap-2 flex justify-center items-center p-1">
                    <ReportButton />
                    <CallButton onClick={() => setOpenContacts(true)} />
                    <DownloadButton />
                </div>

                <div className="rounded-full flex !justify-center !items-center p-[1px] relative -ml-0.5">
                    <MoreMenu />
                </div>
            </div>

            {/* Modal kontak dokter */}
            <ContactModal
                open={openContacts}
                onOpenChange={setOpenContacts}
                contacts={vetContacts}
            />
        </>
    );
}

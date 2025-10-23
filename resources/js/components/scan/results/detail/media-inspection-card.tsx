import React from 'react'
import MediaViewer from './inspection/media-viewer'
import MetaRow from './inspection/meta-row'
import NotesTextArea from './inspection/notes-text-area'

export default function MediaInspectionCard() {
    return (
        <div className='px-4 py-4 rounded-2xl overflow-hidden shadow-md bg-white flex flex-col w-full gap-4'>
            <h3 className='text-[#074DE5] font-bold text-center'>Hasil Analisis</h3>
            <MediaViewer />
            <MetaRow />
            <NotesTextArea />
        </div>
    )
}

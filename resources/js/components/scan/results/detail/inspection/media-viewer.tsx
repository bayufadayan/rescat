import React from 'react'

export default function MediaViewer() {
    return (
        <div className='w-full aspect-square rounded-lg shrink-0 grow-0 flex max-w-lg'>
            <figure>
                <img src="https://placehold.co/600x600/png" alt="Media Viewer" className='w-full h-full object-cover rounded-lg object-center'/>
            </figure>
        </div>
    )
}

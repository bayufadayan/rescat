import React from 'react';

type WarningBannerProps = { children: React.ReactNode }

const WarningBanner: React.FC<WarningBannerProps> = ({ children }) => (
    <div className="pointer-events-none absolute left-0 right-0 bottom-28 z-20 flex w-full justify-center px-4 mb-2">
        <div className="flex max-w-md items-center gap-1.5 rounded-full bg-white px-2 py-2 text-sm text-gray-900 shadow justify-center w-fit font-medium">
            <figure className='w-6 h-6 overflow-hidden'>
                <img src="/images/icon/warning-icon.svg" alt="warning-icon" className='w-full h-full object-center object-cover'/>
            </figure>
            <p className="leading-snug">{children}</p>
        </div>
    </div>
)

export default WarningBanner

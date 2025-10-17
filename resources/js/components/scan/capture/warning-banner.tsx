import React from 'react'
import { AlertCircle } from 'lucide-react'

type WarningBannerProps = { children: React.ReactNode }

const WarningBanner: React.FC<WarningBannerProps> = ({ children }) => (
    <div className="pointer-events-none absolute left-0 right-0 bottom-28 z-20 flex w-full justify-center px-4">
        <div className="flex w-full max-w-md items-start gap-2 rounded-xl bg-white/95 p-3 text-sm text-gray-900 shadow">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="leading-snug">{children}</p>
        </div>
    </div>
)

export default WarningBanner

import React from "react"
import { CheckCircle2 } from "lucide-react"

const HeaderBar: React.FC = () => (
    <div className="sticky top-0 z-10 flex items-center justify-center bg-[#0da0ff] py-4">
        <div className="relative">
            <CheckCircle2 className="h-12 w-12 text-white drop-shadow" />
        </div>
    </div>
)

export default HeaderBar

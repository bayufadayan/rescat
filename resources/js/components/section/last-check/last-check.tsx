import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react'

export default function LastCheck() {
    return (
        <section className="flex flex-col w-full gap-2 px-4" style={{ border: "1px solid rgba(255, 255, 255, 0.3)" }}>
            <div className='flex justify-between px-1'>
                <h3 className="font-semibold text-lg">Last Check</h3>

                <Link href={"/scan/results"} className="flex gap-0.5 text-black/60 text-sm self-center items-center">
                    Lainnya
                    <ChevronRight size={16} />
                </Link>
            </div>

            <div className="flex flex-col gap-2 relative w-full h-86 rounded-2xl shadow-md overflow-hidden">
                <figure className="w-full h-full inset-0 relative">
                    <img
                        src="/images/dummy/cat-original.png"
                        alt="cat-original"
                        className="w-full h-full object-cover absolute inset-0"
                    />
                    <img
                        src="/images/dummy/cat-cropped-scan.png"
                        alt="cat-cropped"
                        className="w-full h-full object-cover absolute inset-0 animate-pulse"
                    />
                </figure>

                <div className="absolute -bottom-72 left-1/2 -translate-x-1/2 w-full rounded-full overflow-hidden px-6 py-2 bg-white/20 backdrop-blur-md shadow-lg border border-white/30 h-full scale-150 flex flex-col items-center">
                    <span className="text-white font-semibold text-xl mt-5">Score: 92%</span>
                    <span className="text-xs text-gray-200">(Good)</span>
                </div>

                <Link href={"/summary"}>
                    <figure className='absolute bottom-6 right-6 w-6 h-6 overflow-hidden'>
                        <img src="/images/icon/arrow.svg" alt="cat-profile" className="w-full h-full object-cover" />
                    </figure>
                </Link>

                <div className='absolute top-4 right-4 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md shadow-lg border border-white/30 text-xs !font-normal'>
                    <span className="text-white text-xs">Face-Only check-up</span>
                </div>
            </div>
        </section>
    )
}

import React from 'react'
import ScoreGauge from './score-gauge'
import QuickActionBar from './quick-action-bar'

export default function ResultHeader() {

    return (
        <section className='min-h-1/2 px-4 flex flex-col pt-22 pb-14 rounded-b-2xl text-white gap-6 bg-[linear-gradient(to_bottom,_#0091F3,_#21A6FF)] relative overflow-hidden'>
            <div className="absolute w-full h-full bg-[url('/images/background/pink-purple.png')] bg-cover bg-center bg-no-repeat inset-0 mix-blend-soft-light" />
            <div className="w-full flex justify-center items-center relative">
                <ScoreGauge />
            </div>

            <div className="w-full flex justify-center items-center relative">
                <QuickActionBar />
            </div>
        </section>
    )
}

import React from 'react'
import cardData from '@/constants/small-card-data'
import SmallCard from './small-card'
import BigCard from './big-card'

export default function HeroSection() {
    return (
        <section className='min-h-1/2 px-4 flex flex-col pt-22 pb-4 rounded-b-2xl text-white gap-4 bg-[linear-gradient(to_bottom,_#0091F3,_#21A6FF)] relative overflow-hidden'>
            <div className="absolute w-full h-full bg-[url('/images/background/pink-purple.png')] bg-cover bg-center bg-no-repeat inset-0 mix-blend-soft-light" />
            <h1 className='font-semibold text-2xl'>Scan, Kenali, dan Sayangi Kucing Anda</h1>
            <div className="flex gap-2 w-full">
                <BigCard />

                <div className="flex flex-col flex-1 gap-2">
                    {cardData.map((card, index) => (
                        <SmallCard
                            key={index}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                            href={card.href}
                        />
                    ))}
                </div>
            </div>

        </section>
    )
}

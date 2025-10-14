import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export default function HistoryPreview() {
    const dummyHistory = [
        {
            id: 1,
            image: 'https://picsum.photos/seed/cat1/400/300',
            score: 92.45,
            date: '2025-01-14T17:28:20',
        },
        {
            id: 2,
            image: 'https://picsum.photos/seed/cat2/400/300',
            score: 87.32,
            date: '2025-01-12T09:15:05',
        },
        {
            id: 3,
            image: 'https://picsum.photos/seed/cat3/400/300',
            score: 95.67,
            date: '2025-01-10T22:40:11',
        },
        {
            id: 4,
            image: 'https://picsum.photos/seed/cat4/400/300',
            score: 78.90,
            date: '2025-01-08T14:05:55',
        },
    ];

    return (
        <section className="flex flex-col w-full gap-2 px-4" style={{ border: "1px solid rgba(255, 255, 255, 0.3)" }}>
            <div className='flex justify-between px-1'>
                <h3 className="font-semibold text-lg">History</h3>

                <Link href={"/history"} className="flex gap-0.5 text-black/60 text-sm self-center items-center">
                    See all
                    <ChevronRight size={16} />
                </Link>
            </div>

            <div className="flex flex-col gap-2 w-full overflow-hidden">
                <ul className='flex flex-col gap-2 w-full'>
                    {dummyHistory.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={`/${item.id}`}
                                className='p-2 rounded-full overflow-hidden bg-[#ccdffc] w-full flex justify-between items-center gap-2 hover:bg-[#b5cefa] transition'
                            >
                                <div className='flex flex-1 gap-2'>
                                    <figure className='w-12 h-12 rounded-full overflow-hidden'>
                                        <img
                                            src={item.image}
                                            alt="foto"
                                            className='w-full h-full object-center object-cover'
                                        />
                                    </figure>

                                    <div className='flex flex-col gap-0.5 justify-center'>
                                        <h5 className='font-semibold'>Healty Score {item.score}</h5>
                                        <p className="text-xs text-black/70">
                                            {new Intl.DateTimeFormat("en-GB", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                                hour12: false,
                                            }).format(new Date(item.date))}
                                        </p>
                                    </div>
                                </div>

                                <figure className='p-1 rounded-full flex items-center justify-center'>
                                    <ChevronRight size={28} />
                                </figure>
                            </Link>
                        </li>
                    ))}

                    <li className='w-full h-full flex items-center justify-center'>
                        <Link
                            href={`/`}
                            className='py-2 px-4 rounded-full w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold text-center text-sm shadow-md hover:opacity-90 transition'
                        >
                            Tampilkan Semua
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    )
}

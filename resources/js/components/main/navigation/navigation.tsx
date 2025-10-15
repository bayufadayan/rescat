import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';

type Tab = 'home' | 'history';

export default function Navigation() {
    const route = useRoute();
    const [activeTab, setActiveTab] = useState<Tab>('home');

    return (
        <div
            className='flex w-[220px] rounded-full fixed z-50 bg-[#E5E8EC] self-center bottom-4 p-1'
            style={{
                boxShadow:
                    '-4px -4px 20px 0 rgba(255, 255, 255, 0.25), 4px 4px 20px 0 rgba(255, 255, 255, 0.25)',
            }}
        >
            <button
                onClick={() => {
                    setActiveTab('home');
                    router.visit(route('home'));
                }}
                className={`flex-1 p-1 rounded-full flex items-center justify-center py-3 transition cursor-pointer
                        ${activeTab === 'home' ? 'bg-[#0091F3]' : 'bg-[#E5E8EC]'}`}
            >
                <figure className='h-8 w-8'>
                    <img
                        src={
                            activeTab === 'home'
                                ? '/images/icon/home-navigation-selected.svg'
                                : '/images/icon/home-navigation-unselect.svg'
                        }
                        alt="home-icon"
                        className='w-full h-full'
                    />
                </figure>
            </button>

            <button
                onClick={() => {
                    setActiveTab('history');
                    router.visit(route('onboarding'));
                }}
                className={`flex-1 p-1 rounded-full flex items-center justify-center py-3 transition cursor-pointer 
                    ${activeTab === 'history' ? 'bg-[#0091F3]' : 'bg-[#E5E8EC]'}`}
            >
                <figure className='h-8 w-8'>
                    <img
                        src={
                            activeTab === 'history'
                                ? '/images/icon/history-navigation-selected.svg'
                                : '/images/icon/history-navigation-unselect.svg'
                        }
                        alt="history-icon"
                        className='w-full h-full'
                    />
                </figure>
            </button>
        </div>
    );
}

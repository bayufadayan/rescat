import React from 'react';
import { Home } from 'lucide-react';
import { useRoute } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import CatTrio from '@/components/thankyou/cat-trio';

export default function ThankYouPage() {
    const route = useRoute()

    return (
        <div className="min-h-svh max-h-lvh h-screen flex items-center justify-center bg-[linear-gradient(to_bottom,_#0091F3,_#21A6FF)] relative overflow-hidden">
            <div className="absolute hidden md:flex w-full h-full bg-[url('/images/background/pink-purple.png')] bg-cover bg-center bg-no-repeat mix-blend-soft-light" />
            <img
                src="/images/background/onboard-pattern.png"
                alt="onboarding-top-pattern"
                className="absolute flex md:hidden inset-0 h-[30%] w-auto md:w-full md:h-[20%] object-cover mix-blend-screen opacity-50 object-left"
            />

            <div className="h-full w-full flex flex-col pt-8 px-8 z-10 gap-8 items-center">
                <div className="flex justify-start items-center w-full text-white relative max-w-[880px]">
                    <button
                        onClick={() => (window.location.href = route('home'))}
                        className="
                            w-fit p-2.5 rounded-xl bg-white 
                            shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]
                            hover:shadow-[inset_0_3px_6px_rgba(0,0,0,0.25)]
                            active:scale-95 transition-all duration-200 ease-out
                            border border-white/60
                            backdrop-blur-sm
                            cursor-pointer
                        "
                    >
                        <Home size={28} className="text-neutral-800" />
                    </button>

                </div>

                <div className="flex w-full max-w-[880px] flex-col gap-4 -mt-4">
                    <h1 className="font-extrabold text-white text-6xl md:text-6xl leading-tight">
                        Makasihh yahh,{' '}
                        <span className="relative inline-block -rotate-5">
                            <span
                                className="
                                    relative inline-flex items-center justify-center
                                    rounded-2xl px-4 py-2 md:px-5 md:py-2.5
                                    ring-1 ring-white/40 shadow-[0_10px_30px_rgba(14,165,233,.35)]
                                    bg-[radial-gradient(120%_140%_at_0%_0%,#9AE6FF_0%,#60A5FA_35%,#7C3AED_72%,#0EA5E9_100%)]
                                    before:absolute before:inset-0 before:rounded-2xl
                                    before:bg-[radial-gradient(120%_80%_at_30%_20%,rgba(255,255,255,.55),transparent)]
                                    before:opacity-70 before:pointer-events-none
                                    after:absolute after:-inset-px after:rounded-2xl after:bg-white/10 after:backdrop-blur-[1px]
                                    text-white tracking-tight select-none
                                "
                            >
                                <span
                                    className="
                                    relative z-10 font-extrabold
                                    bg-clip-text text-transparent
                                    bg-[linear-gradient(90deg,rgba(255,255,255,0.98),rgba(255,255,255,0.78),rgba(255,255,255,0.98))]
                                    bg-[length:200%_100%] animate-nick-shimmer
                                    drop-shadow-[0_0_14px_rgba(255,255,255,0.45)]
                                    "
                                >
                                    Cuyy!
                                </span>
                            </span>
                        </span>
                    </h1>

                    <style>{`
                        @keyframes nick-shimmer {
                            0%   { background-position: 0% 50%;    }
                            50%  { background-position: 100% 50%;  }
                            100% { background-position: 0% 50%;    }
                        }
                        .animate-nick-shimmer {
                            animation: nick-shimmer 3.2s ease-in-out infinite;
                        }
                    `}</style>

                    <p className="text-white/95">
                        Kalau ngga ada kamu (nickname), ngga selesai kali nih aplikasi. Kalau ada feedback atau mau ngasih tau ada fitur error, isi feedback.
                    </p>
                    <Button
                        type="button"
                        className="w-full bg-white text-black py-5 rounded-xl"
                        tabIndex={4}
                        data-test="login-button"
                        onClick={() => (window.location.href = route('feedback'))}
                    >
                        Feedback (&lt; 5 menit)
                    </Button>
                </div>

                <div className="w-full flex justify-center items-center max-w-[880px] -z-10">
                    <CatTrio />
                </div>
            </div>
        </div>
    )
}
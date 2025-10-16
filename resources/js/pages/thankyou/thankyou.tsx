"use client";
import React from "react";
import { Home } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

export default function ThankYouPage() {
    const route = useRoute();

    return (
        <div className="min-h-screen flex flex-col bg-[#0094FF] text-white relative">
            {/* Header */}
            <div className="flex justify-between items-center p-4">
                <button>
                    <Home className="w-6 h-6" />
                </button>
                <h4 className="font-bold text-lg"> </h4>
                <button className="invisible">
                    <Home className="w-6 h-6" />
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center px-6 text-center flex-1">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-6">
                    Makasih <br />
                    Banget yaa, <br />
                    (Nickname)!
                </h1>
                <p className="text-sm md:text-base mt-4 text-white/80">
                    Kalau ngga ada kamu (nickname), ngga selesai kali nih aplikasi. Kalau ada
                    feedback atau mau ngasih tau ada fitur error, isi feedback
                </p>

                {/* Feedback Button */}
                <Link
                    href={route("onboarding")}
                    className="bg-white text-black rounded-xl font-medium px-6 py-3 mt-6 shadow"
                >
                    Feedback (&lt; 5 menit)
                </Link>

                {/* Dummy Images */}
                <div className="relative w-full max-w-xs mt-10">
                    <div className="absolute top-2 left-2 w-full h-full rounded-xl bg-white/30 rotate-[-6deg]" />
                    <div className="absolute top-2 right-2 w-full h-full rounded-xl bg-white/30 rotate-[6deg]" />
                    <img
                        src="https://picsum.photos/seed/cat-hero/800/1000.jpg"
                        alt="dummy"
                        className="relative w-full rounded-xl object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

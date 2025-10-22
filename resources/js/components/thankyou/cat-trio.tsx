export default function CatTrio() {
    return (
        <div className="relative w-full max-w-[880px] h-[400px] md:h-[380px]">
            {/* LEFT: miring kiri */}
            <figure className="absolute top-4 -left-16 md:left-8 md:top-10 -rotate-[8deg] z-10 shadow-[0_-20px_20px_rgba(255,255,255,0.2)]">
                <div className="relative w-[320px] h-[420px] rounded-2xl overflow-hidden shadow-xl shadow-black/25 ring-1 ring-white/30 bob-slow">
                    <img
                        src="/images/dummy/cat-original.png"
                        alt="cat-left"
                        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                    />
                    <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl bg-blue-500/25 mix-blend-multiply"
                    />
                </div>
            </figure>

            {/* CENTER: paling depan */}
            <figure className="absolute top-0 left-1/2 -translate-x-1/2 rotate-0 z-30 shadow-[0_-20px_20px_rgba(255,255,255,0.2)]">
                <div className="relative w-[320px] h-[420px] rounded-2xl overflow-hidden shadow-2xl shadow-black/35 ring-1 ring-white/40 bob-mid">
                    <img
                        src="/images/dummy/cat-original.png"
                        alt="cat-center"
                        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                    />
                    <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl bg-blue-500/25 mix-blend-multiply"
                    />
                </div>
            </figure>

            {/* RIGHT: miring kanan */}
            <figure className="absolute top-4 -right-16 md:right-8 md:top-10 rotate-[8deg] z-20 shadow-[0_-20px_20px_rgba(255,255,255,0.2)]">
                <div className="relative w-[320px] h-[420px] rounded-2xl overflow-hidden shadow-xl shadow-black/25 ring-1 ring-white/30 bob-fast">
                    <img
                        src="/images/dummy/cat-original.png"
                        alt="cat-right"
                        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                    />
                    <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl bg-blue-500/25 mix-blend-multiply"
                    />
                </div>
            </figure>

            {/* Animasi halus (anak elemen, tidak mengganggu transform parent) */}
            <style>{`
        @keyframes bob { 0% { transform: translateY(0) } 100% { transform: translateY(-8px) } }
        .bob-slow { animation: bob 7s ease-in-out infinite alternate; }
        .bob-mid  { animation: bob 6s ease-in-out infinite alternate; }
        .bob-fast { animation: bob 5.5s ease-in-out infinite alternate; }
      `}</style>
        </div>
    )
}
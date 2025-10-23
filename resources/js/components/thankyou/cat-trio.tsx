export default function CatTrio() {
    return (
        <div className="relative w-full max-w-[880px] h-[400px] md:h-[380px] [perspective:1200px]">
            {/* LEFT */}
            <figure className="absolute top-4 -left-16 md:left-8 md:top-10 -rotate-[8deg] z-10">
                <div className="relative w-[320px] h-[420px] rounded-2xl overflow-hidden shadow-xl shadow-black/25 ring-1 ring-white/30 ani-left">
                    <img
                        src="/images/dummy/cat-original.png"
                        alt="cat-left"
                        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                    />
                    <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl bg-blue-500/25 mix-blend-multiply"
                    />
                    <span aria-hidden className="absolute inset-0 rounded-2xl glow" />
                    <span aria-hidden className="absolute inset-0 rounded-2xl shine delay-200" />
                </div>
            </figure>

            {/* CENTER */}
            <figure className="absolute top-0 left-1/2 -translate-x-1/2 rotate-0 z-30">
                <div className="relative w-[320px] h-[420px] rounded-2xl overflow-hidden shadow-2xl shadow-black/35 ring-1 ring-white/40 ani-center">
                    <img
                        src="/images/dummy/cat-original.png"
                        alt="cat-center"
                        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                    />
                    <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl bg-blue-500/30 mix-blend-multiply"
                    />
                    <span aria-hidden className="absolute inset-0 rounded-2xl glow" />
                    <span aria-hidden className="absolute inset-0 rounded-2xl shine delay-400" />
                </div>
            </figure>

            {/* RIGHT */}
            <figure className="absolute top-4 -right-16 md:right-8 md:top-10 rotate-[8deg] z-20">
                <div className="relative w-[320px] h-[420px] rounded-2xl overflow-hidden shadow-xl shadow-black/25 ring-1 ring-white/30 ani-right">
                    <img
                        src="/images/dummy/cat-original.png"
                        alt="cat-right"
                        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                    />
                    <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl bg-blue-500/25 mix-blend-multiply"
                    />
                    <span aria-hidden className="absolute inset-0 rounded-2xl glow" />
                    <span aria-hidden className="absolute inset-0 rounded-2xl shine delay-600" />
                </div>
            </figure>

            {/* Animation Styles */}
            <style>{`
        /* --- Keyframes --- */
        @keyframes bobbing {
          0%   { transform: translateY(0); }
          25%  { transform: translateY(-10px); }
          50%  { transform: translateY(-4px); }
          75%  { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        @keyframes driftX { 0% { transform: translateX(0) } 100% { transform: translateX(6px) } }
        @keyframes tilt { 0% { rotateY(-5deg) } 100% { rotateY(5deg) } }
        @keyframes pulseShadow { 0%,100% { box-shadow: 0 15px 40px rgba(0,0,0,.28) } 50% { box-shadow: 0 25px 60px rgba(0,0,0,.36) } }
        @keyframes glowA { 0%,100% { opacity:.18 } 50% { opacity:.35 } }
        @keyframes shineSweep { 0% { transform: translateX(-120%) } 100% { transform: translateX(120%) } }

        /* --- Combined Animations --- */
        .ani-left {
          animation:
            bobbing 7.8s ease-in-out infinite,
            driftX 9s ease-in-out infinite alternate,
            tilt 8s ease-in-out infinite alternate,
            pulseShadow 6s ease-in-out infinite;
          animation-delay: .8s, .2s, .3s, .5s;
          transform-style: preserve-3d;
        }
        .ani-center {
          animation:
            bobbing 6.4s ease-in-out infinite,
            tilt 7.2s ease-in-out infinite alternate,
            pulseShadow 5.5s ease-in-out infinite;
          animation-delay: .2s, .4s, .3s;
          transform-style: preserve-3d;
        }
        .ani-right {
          animation:
            bobbing 8.4s ease-in-out infinite,
            driftX 8.5s ease-in-out infinite alternate-reverse,
            tilt 9s ease-in-out infinite alternate,
            pulseShadow 6.2s ease-in-out infinite;
          animation-delay: 1.4s, .6s, .8s, .2s;
          transform-style: preserve-3d;
        }

        /* --- Glow & Shine --- */
        .glow {
          background: radial-gradient(50% 60% at 50% 60%, rgba(56,189,248,.35) 0%, rgba(56,189,248,.12) 55%, rgba(56,189,248,0) 80%);
          mix-blend-mode: screen;
          animation: glowA 3.8s ease-in-out infinite;
        }
        .shine {
          background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,.12) 40%, rgba(255,255,255,.28) 50%, rgba(255,255,255,.12) 60%, transparent 100%);
          mix-blend-mode: screen;
          transform: translateX(-120%);
          animation: shineSweep 3.6s linear infinite;
        }

        .delay-200 { animation-delay: .2s; }
        .delay-400 { animation-delay: .4s; }
        .delay-600 { animation-delay: .6s; }
      `}</style>
        </div>
    );
}

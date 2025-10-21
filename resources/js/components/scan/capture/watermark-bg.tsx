import React from "react";

export default function WatermarkBackground() {
    return (
        <div className="relative min-h-screen w-full bg-neutral-800 overflow-hidden text-white -z-10">
            <style>{`
        @keyframes slideBG {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 240px 0, 0 240px; }
        }
        @keyframes drift {
          0%   { transform: rotate(-30deg) translate3d(0, 0, 0) scale(1.2); }
          100% { transform: rotate(-30deg) translate3d(-320px, -320px, 0) scale(1.2); }
        }
        @keyframes bob {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-6px); }
        }
      `}</style>

            {/* Layer garis diagonal tipis yang geser pelan */}
            <div
                className="absolute inset-0 opacity-[0.04] rotate-[-30deg] scale-[1.5] pointer-events-none select-none"
                style={{
                    backgroundImage: `
            repeating-linear-gradient(
              transparent 0 80px,
              rgba(255,255,255,0.1) 80px 81px
            ),
            repeating-linear-gradient(
              45deg,
              transparent 0 180px,
              rgba(255,255,255,0.1) 180px 181px
            )
          `,
                    animation: "slideBG 60s linear infinite",
                }}
            />

            {/* Grid watermark yang drift pelan */}
            <div
                className="absolute -top-28 right-0 left-0 flex flex-wrap justify-center items-center opacity-[0.05] rotate-[-30deg] scale-[1.2]"
                style={{ animation: "drift 50s linear infinite" }}
            >
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 m-10 text-2xl font-semibold tracking-wide"
                        style={{
                            animation: "bob 6s ease-in-out infinite",
                            animationDelay: `${(i % 12) * 0.15}s`,
                        }}
                    >
                        <img
                            src="/images/icon/favicon-white.svg"
                            alt="logo"
                            className="h-8 w-8 object-contain"
                        />
                        <span>ResCat.life</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

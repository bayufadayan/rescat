// resources/js/components/onboarding/background.tsx
import * as React from "react";

type Props = {
    image: string;
    imageAlt?: string;
    children?: React.ReactNode;
};

export default function Background({ image, imageAlt, children }: Props) {
    return (
        <div className="relative min-h-dvh w-full overflow-hidden bg-[linear-gradient(to_bottom,_#0091F3,_#21A6FF)]">
            <img
                src="/images/background/pink-purple.png"
                alt="onboarding-bottom-pattern"
                className="absolute h-full w-full object-cover bottom-0 mix-blend-soft-light object-bottom-left"
                style={{
                    maskImage: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8) 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8) 100%)"
                }}
            />
            <img
                src={image}
                alt={imageAlt ?? "Onboarding background"}
                className="absolute inset-0 h-[80%] w-full object-cover object-bottom"
                style={{
                    maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
                }}
            />
            <img src="/images/background/onboard-pattern.png"
                alt="onboarding-top-pattern"
                className="absolute inset-0 h-[30%] w-auto md:w-full md:h-[20%] object-cover mix-blend-screen object-left"
            />
            <div className="relative z-10 flex min-h-dvh flex-col justify-between px-8">
                {children}
            </div>
        </div>
    );
}

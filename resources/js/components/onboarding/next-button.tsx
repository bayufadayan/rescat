// resources/js/components/onboarding/next-button.tsx
import * as React from "react";

type Props = {
    isLast?: boolean;
    onNext?: () => void;
};

export default function NextButton({ isLast, onNext }: Props) {
    if (isLast) {
        return null;
    }

    return (
        <div className="relative h-15 w-15 overflow-visible items-center flex">
            <div
                className="absolute right-0 h-15 w-15 rounded-full z-[100] pointer-events-none bg-[#C0DEFA]"
                style={{
                    position: "absolute",
                    borderRadius: "9999px",
                    WebkitMaskImage:
                        "radial-gradient(circle 50px at 40% center, transparent 62%, black 63%)",
                    maskImage:
                        "radial-gradient(circle 50px at 40% center, transparent 62%, black 63%)",
                    WebkitMaskComposite: "destination-out",
                    maskComposite: "exclude",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                }}
            ></div>

            <button
                onClick={onNext}
                aria-label="Next"
                className="
                relative z-10
                grid h-[52px] w-[52px] place-items-center
                rounded-full bg-white text-sky-700
                transition active:scale-90 my-0.5
                duration-200 ease-in-out
                hover:-translate-x-2
                cursor-pointer
            "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="17"
                    viewBox="0 0 22 17"
                    fill="none"
                >
                    <path
                        d="M21 8.5L13.5 16M21 8.5L13.5 1M21 8.5H7.875M1 8.5H4.125"
                        stroke="#0081FE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
}

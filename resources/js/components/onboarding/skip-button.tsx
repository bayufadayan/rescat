import * as React from "react";

type Props = {
    hidden?: boolean;
    onSkip?: () => void;
};

export default function SkipButton({ hidden, onSkip }: Props) {
    if (hidden) return null;
    return (
        <button
            onClick={onSkip}
            className="text-white hover:underline underline-offset-4 decoration-white transition"
        >
            Skip
        </button>
    );
}

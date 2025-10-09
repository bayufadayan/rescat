import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type LottieDotProps = {
    src: string;
    autoplay?: boolean;
    loop?: boolean;
    width?: number;
    height?: number;
    className?: string;
};

export default function LottiePlayer({
    src,
    autoplay = true,
    loop = true,
    width = 200,
    height = 200,
    className = "",
}: LottieDotProps) {
    return (
        <div className={className}>
            <DotLottieReact
                src={src}
                autoplay={autoplay}
                loop={loop}
                style={{ width, height }}
            />
        </div>
    );
}

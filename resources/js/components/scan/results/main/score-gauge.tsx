import React from "react";

type Props = {
    value?: number;
    label?: string;
    size?: number;
    outerWidth?: number;
    innerWidth?: number;
};

const ScoreGauge: React.FC<Props> = ({
    value = 80,
    label = "Sehat",
    size = 240,
    outerWidth = 14,
    innerWidth = 14,
}) => {
    const pct = Math.max(0, Math.min(100, value));
    const edgeFeatherPct = 0;
    const tailPct = 100;
    const oversample = 2;
    const featherPx = 0.75;

    const wrapW = size;
    const wrapH = size;

    const paintBox = Math.round((size - 20) * oversample);
    const outerSize = paintBox;
    const innerSize = Math.round(outerSize - 2 * outerWidth * oversample);

    const ringMask = (w: number) =>
        `radial-gradient(farthest-side, transparent calc(100% - ${w * oversample + featherPx}px), #000 calc(100% - ${w * oversample}px))`;

    const outerBg = `conic-gradient(
        from -90deg,
        #0091F3 0% calc(${pct - edgeFeatherPct}%),
        rgba(0,145,243,0.85) ${pct}%,
        transparent calc(${pct + edgeFeatherPct}%),
        transparent 100%
    )`;

    const innerBg = `conic-gradient(
        from -90deg,
        rgba(105,194,254,0) 0% calc(${Math.max(0, pct - tailPct)}%),
        rgba(105,194,254,0.6) calc(${Math.max(0, pct - edgeFeatherPct)}%),
        #69C2FE ${pct}%,
        rgba(105,194,254,0.6) calc(${pct + edgeFeatherPct}%),
        transparent calc(${pct + edgeFeatherPct + 0.4}%),
        transparent 100%
    )`;

    return (
        <div
            className="bg-white rounded-full inline-grid place-items-center shadow-sm"
            style={{ width: wrapW, height: wrapH, position: "relative" }}
        >
            <div
                className="absolute inset-0 grid place-items-center"
                style={{ transform: `scale(${1 / oversample})`, transformOrigin: "center", willChange: "transform" }}
            >
                <div
                    className="absolute rounded-full rotate-[90deg]"
                    style={{
                        width: outerSize,
                        height: outerSize,
                        background: outerBg,
                        WebkitMaskImage: ringMask(outerWidth),
                        maskImage: ringMask(outerWidth),
                    }}
                />
                <div
                    className="absolute rounded-full rotate-[90deg]"
                    style={{
                        width: innerSize,
                        height: innerSize,
                        background: innerBg,
                        WebkitMaskImage: ringMask(innerWidth),
                        maskImage: ringMask(innerWidth),
                    }}
                />
            </div>

            <div className="absolute inset-0 grid place-items-center text-center select-none">
                <div className="leading-tight">
                    <div
                        className="font-extrabold"
                        style={{ fontSize: Math.round(size * 0.19), color: "#0f172a", lineHeight: 1 }}
                    >
                        {pct.toFixed(2).replace(".", ",")}
                    </div>
                    <div
                        className="mt-1 font-medium"
                        style={{ fontSize: Math.round(size * 0.08), color: "#0f172aB3" }}
                    >
                        {label}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;

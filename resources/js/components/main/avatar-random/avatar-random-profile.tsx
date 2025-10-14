/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { thumbs, bigSmile, avataaarsNeutral } from "@dicebear/collection";

type AvatarRandomProps = {
    initialSeed?: string;
    size?: number;
};

const STYLES: { key: string; fn: any }[] = [
    { key: "thumbs", fn: thumbs },
    { key: "bigSmile", fn: bigSmile },
    { key: "avataaarsNeutral", fn: avataaarsNeutral },
];

function randSeed() {
    return Math.random().toString(36).slice(2, 10);
}

function pickRandomStyle() {
    const idx = Math.floor(Math.random() * STYLES.length);
    return STYLES[idx];
}

export default function AvatarRandomProfile({ initialSeed, size = 128 }: AvatarRandomProps) {
    const [seed, setSeed] = useState<string>(initialSeed || randSeed());
    const [styleObj, setStyleObj] = useState<{ key: string; fn: any }>(pickRandomStyle());

    const svg = useMemo(() => {
        const avatar = createAvatar(styleObj.fn, {
            seed,
            size,
        });
        return avatar.toString();
    }, [seed, styleObj, size]);

    return (
        <div className="flex flex-col items-center gap-3">
            <div
                className="rounded-full overflow-hidden"
                style={{ width: size, height: size }}
                dangerouslySetInnerHTML={{ __html: svg }}
                aria-hidden
            />
        </div>
    );
}

import React from "react";

export default function ThumbTabItem({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="shrink-0 snap-start w-[120px] h-[85px] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm ring-1 ring-black/5
                    hover:shadow-md hover:ring-black/10 transition-all grid place-items-center text-sm font-medium text-neutral-800"
            role="tab"
            tabIndex={0}
        >
            {children}
        </div>
    );
}

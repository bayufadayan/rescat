import React from "react";

export default function AnalysisGrid({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div className="bg-gray-200 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
            {children || (
                <img
                    src={`https://picsum.photos/seed/${Math.random()}/400`}
                    alt="Analisis"
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
}

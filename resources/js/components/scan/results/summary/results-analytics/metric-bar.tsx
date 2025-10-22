import React from "react";

export default function MetricBar() {
    const metrics = [
        { color: "#F97316", value: 70 },
        { color: "#22C55E", value: 95 },
        { color: "#22C55E", value: 90 },
        { color: "#EF4444", value: 35 },
        { color: "#EF4444", value: 30 },
        { color: "#3B82F6", value: 100 },
    ];

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2">
            {metrics.map((bar, index) => (
                <div
                    key={index}
                    className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden"
                >
                    <div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{
                            width: `${bar.value}%`,
                            backgroundColor: bar.color,
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
} from "recharts";

const data = [
    { label: "Mar", value: 62 },
    { label: "Apr", value: 68 },
    { label: "Mei", value: 73 },
    { label: "Jun", value: 78 },
    { label: "Jul", value: 84 },
    { label: "Agu", value: 89 },
    { label: "Sep", value: 83 },
    { label: "Okt", value: 76 },
];

export default function ChartCard() {
    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-slate-800 font-semibold">History</h3>
                <span className="text-xs text-slate-500">8 bulan terakhir</span>
            </div>

            <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.35} />
                                <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                        />
                        <YAxis
                            width={28}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ stroke: "#94a3b8", strokeDasharray: "3 3" }}
                            contentStyle={{
                                borderRadius: 12,
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                            }}
                            labelStyle={{ color: "#334155", fontWeight: 600 }}
                        />

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="none"
                            fill="url(#areaFill)"
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#0891B2"
                            strokeWidth={3}
                            dot={{ r: 3, fill: "#0891B2", strokeWidth: 0 }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

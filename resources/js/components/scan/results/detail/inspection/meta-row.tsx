import React from "react";

export default function MetaRow() {
    const meta = [
        { label: "Lorem", value: "9384.23" },
        { label: "Ipsum", value: "Ashshiaapp" },
        { label: "Status", value: "Normal" },
        { label: "Tanggal", value: "21 Okt 2025" },
    ];

    return (
        <div className="w-full bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
                <tbody>
                    {meta.map((item, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 last:border-none"
                        >
                            <th className="text-left px-4 py-3 w-1/3 font-semibold text-gray-700 bg-gray-100">
                                {item.label}
                            </th>
                            <td className="px-4 py-3 text-gray-800">{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

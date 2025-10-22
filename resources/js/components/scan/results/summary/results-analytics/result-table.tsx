import React from 'react'

export default function ResultTable() {
    const data = [
        { label: 'Kebersihan', value: 'Bersih' },
        { label: 'Kondisi Mata', value: 'Sehat' },
        { label: 'Hidung', value: 'Normal' },
        { label: 'Mulut', value: 'Tidak Bermasalah' },
        { label: 'Bulu', value: 'Terawat' },
    ]

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-600 text-sm">
                    <tr>
                        <th className="px-4 py-3 font-semibold">Aspek</th>
                        <th className="px-4 py-3 font-semibold text-right">Hasil</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr
                            key={i}
                            className="border-t border-slate-100 hover:bg-slate-50/70 transition-colors"
                        >
                            <td className="px-4 py-3 text-slate-800">{item.label}</td>
                            <td className="px-4 py-3 text-right font-medium text-slate-900">
                                {item.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

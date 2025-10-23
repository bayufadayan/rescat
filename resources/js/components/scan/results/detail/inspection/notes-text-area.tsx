import React from "react";

export default function NotesTextArea() {
    const description = `
Kondisi mata kiri terlihat sedikit kemerahan di area tepi bawah, 
namun tidak menunjukkan tanda infeksi berat. Disarankan untuk 
melakukan pemeriksaan lanjutan jika iritasi berlanjut selama 3 hari.
  `;

    return (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4">
            <h4 className="text-gray-700 font-semibold mb-2">Catatan</h4>
            <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                {description.trim()}
            </div>
        </div>
    );
}

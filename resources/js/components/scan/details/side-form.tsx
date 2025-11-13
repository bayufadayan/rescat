/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import { Shield } from "lucide-react"
import LocationCard from "./location-card"
import type { GeoStatus, Coords, Address } from "@/types/geo"
import { buildSessionPayload } from "@/lib/helper/session-payload";
import { submitScanSession } from "@/lib/helper/submit-session";
import { useRoute } from "ziggy-js";

type Props = {
    status: GeoStatus
    coords: Coords | null
    address: Address | null
    updatedAt: Date | null
    refreshLocation: () => void
    clearLocation: () => void
}

const SideForm: React.FC<Props> = ({ status, coords, address, updatedAt, refreshLocation, clearLocation }) => {
    const [anonymous, setAnonymous] = useState(true)
    const [name, setName] = useState("")
    const [notes, setNotes] = useState("")
    const route = useRoute();

    const copyAddress = async () => {
        const text = address?.display ?? (coords ? `${coords.lat}, ${coords.lon}` : "—")
        try {
            await navigator.clipboard.writeText(text)
        } catch {
            // ds
        }
    }

    return (
        <div className="relative flex h-screen w-full flex-col border-slate-200 bg-white shadow-md overflow-hidden">
            <div
                className="flex-1 overflow-y-auto px-12 py-14"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#a0aec0 transparent",
                }}
            >

                <h3 className="text-lg font-semibold text-slate-800 mb-4">Lengkapi Informasi</h3>
                <LocationCard
                    status={status}
                    coords={coords}
                    address={address}
                    updatedAt={updatedAt}
                    onRefresh={refreshLocation}
                    onCopy={copyAddress}
                    onClear={clearLocation}
                />

                <div className="space-y-2 mt-4">
                    <label className="block text-sm font-medium text-slate-700">Nama kamu</label>
                    <input
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-100 focus:ring-4"
                        placeholder="Nama kamu"
                        value={anonymous ? "" : name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={anonymous}
                    />
                    <label className="mt-2 flex items-center gap-2 text-sm text-slate-700">
                        <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="h-4 w-4 accent-sky-600" />
                        Anonim
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Catatan tambahan (Opsional)</label>
                    <textarea
                        className="min-h-[100px] w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-100 focus:ring-4"
                        placeholder="Tulis catatan tambahan…"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
            </div>

            {/* Footer tetap di bawah */}
            <div className="sticky bottom-0 left-0 w-full bg-white px-12 py-4 border-t border-slate-200 shadow-md">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <Shield className="h-4 w-4" />
                    Data kamu kami lindungi.
                </div>
                <button
                    type="button"
                    className="w-full rounded-2xl bg-sky-600 py-3.5 text-white shadow-lg shadow-sky-600/30 active:scale-[0.98]"
                    onClick={async () => {
                        try {
                            const payload = buildSessionPayload(address, coords, {
                                informer: (anonymous ? "Anonim" : (name || "Anonim")),
                                notes
                            });
                            const { data } = await submitScanSession(route("scan.sessions.store"), payload);

                            [
                                "scanOption",
                                "scanType",
                                "scan:original",
                                "scan:meta",
                                "scan:bounding-box",
                                "scan:roi",
                                "scan:session_id",
                                "scan:session_image_id"
                            ].forEach(key => localStorage.removeItem(key));

                            [
                                "scan:result",
                                "scan:rid"
                            ].forEach(key => sessionStorage.removeItem(key));

                            localStorage.setItem("scan:session_id", data.session_id);
                            localStorage.setItem("scan:session_image_id", data.image_id);

                            window.location.href = route("scan.process", data.session_id);
                        } catch (e: any) {
                            alert(e?.message || "Gagal membuat sesi.");
                        }
                    }}
                >
                    Periksa Sekarang
                </button>
            </div>
        </div>
    )
}

export default SideForm

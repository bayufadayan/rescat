import React, { useState } from "react"
import * as Drawer from "vaul"
import { Shield } from "lucide-react"
import LocationCard from "./location-card"
import type { GeoStatus, Coords, Address } from "@/types/geo"

type Props = {
    open: boolean
    setOpen: (v: boolean) => void
    status: GeoStatus
    coords: Coords | null
    address: Address | null
    updatedAt: Date | null
    refreshLocation: () => void
    clearLocation: () => void
}

const BottomForm: React.FC<Props> = ({ open, setOpen, status, coords, address, updatedAt, refreshLocation, clearLocation }) => {
    const [anonymous, setAnonymous] = useState(true)
    const [name, setName] = useState("")
    const [notes, setNotes] = useState("")

    const copyAddress = async () => {
        const text = address?.display ?? (coords ? `${coords.lat}, ${coords.lon}` : "—")
        try {
            await navigator.clipboard.writeText(text)
        } catch {
            // no-op
        }
    }

    return (
        <Drawer.Root open={open} onOpenChange={setOpen} dismissible modal={false}>
            <Drawer.Overlay className="fixed inset-0 bg-black/20" />
            <Drawer.Portal>
                <Drawer.Content
                    className="fixed inset-x-0 bottom-0 z-[60] mx-auto w-full max-w-[480px] rounded-t-3xl bg-white shadow-2xl"
                    style={{ "--initial-transform": "translateY(25vh)" } as React.CSSProperties}
                >
                    <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-300/80" />
                    <div className="max-h-[65vh] overflow-y-auto px-4 pb-28 pt-4">
                        <div className="mx-auto mb-2 h-1 w-20 rounded-full bg-slate-200" />
                        <h3 className="text-center text-[15px] font-semibold text-slate-800">Tolong lengkapi informasi dibawah ini</h3>

                        <div className="mt-4 space-y-4">
                            <LocationCard
                                status={status}
                                coords={coords}
                                address={address}
                                updatedAt={updatedAt}
                                onRefresh={refreshLocation}
                                onCopy={copyAddress}
                                onClear={clearLocation}
                            />

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Your name</label>
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
                                <label className="block text-sm font-medium text-slate-700">Describing your thought (Optional)</label>
                                <textarea
                                    className="min-h-[120px] w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-100 focus:ring-4"
                                    placeholder="Tulis catatan tambahan…"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Shield className="h-4 w-4" />
                                Data kamu kami lindungi.
                            </div>
                        </div>
                    </div>

                    <div className="pointer-events-auto absolute inset-x-0 bottom-0 bg-white/95 p-4 backdrop-blur">
                        <button
                            type="button"
                            className="w-full rounded-2xl bg-sky-600 py-3.5 text-white shadow-lg shadow-sky-600/30 active:scale-[0.98]"
                            onClick={() => {
                                console.log({
                                    anonymous,
                                    name: anonymous ? "Anonim" : name || "-",
                                    notes,
                                    coords,
                                    address,
                                })
                                alert("Form dikirim (cek console) ✅")
                            }}
                        >
                            Periksa Sekarang
                        </button>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export default BottomForm

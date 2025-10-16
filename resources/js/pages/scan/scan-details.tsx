import React, { useEffect, useMemo, useState } from "react"
import {
    CheckCircle2,
    Dot,
    MapPin,
    RefreshCw,
    Clock,
    ChevronUp,
    Copy,
    Trash2,
    Shield,
} from "lucide-react"
import * as Drawer from "vaul"

/* ============================================================================
 * Types
 * ==========================================================================*/

type Coords = { lat: number; lon: number }
type GeoStatus = "idle" | "locating" | "ready" | "error"
type Address = {
    display: string
    city?: string
    state?: string
    country?: string
}

/* ============================================================================
 * Utilities
 * ==========================================================================*/

/** Panggil Nominatim untuk reverse geocoding */
async function reverseGeocode({ lat, lon }: Coords): Promise<Address> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    const res = await fetch(url, {
        headers: { "Accept-Language": "id,en;q=0.7", "User-Agent": "scan-details-demo" },
    })
    if (!res.ok) throw new Error("Reverse geocode gagal")
    const data = await res.json()
    const addr = data.address ?? {}
    return {
        display: data.display_name ?? "",
        city: addr.city || addr.town || addr.village || addr.county,
        state: addr.state,
        country: addr.country,
    }
}

/* ============================================================================
 * Sub-components (modular, tetap 1 file)
 * ==========================================================================*/

const HeaderBar: React.FC = () => (
    <div className="sticky top-0 z-10 flex items-center justify-center bg-[#0da0ff] py-4">
        <div className="relative">
            <CheckCircle2 className="h-12 w-12 text-white drop-shadow" />
            <div className="absolute -right-4 -top-1 rounded-full bg-white/25 px-2 py-0.5 text-[10px] text-white">
                OK
            </div>
        </div>
    </div>
)

const MediaPreview: React.FC = () => {
    // gambar dummy
    const hero =
        "https://picsum.photos/seed/cat-hero/800/1000.jpg"
    const thumbs = useMemo(
        () =>
            Array.from({ length: 5 }).map(
                (_, i) => `https://picsum.photos/seed/cat-${i + 1}/300/300.jpg`
            ),
        []
    )

    return (
        <div className="mx-auto w-full max-w-[400px] px-4">
            <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-xl">
                <img
                    src={hero}
                    alt="Preview"
                    className="h-[360px] w-full object-cover"
                />

                {/* Badge pojok kiri atas seperti indikator carousel */}
                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs text-slate-700">
                    <Dot className="h-5 w-5 -mx-2 text-emerald-500" />
                    <Dot className="h-5 w-5 -mx-2 text-slate-300" />
                    <Dot className="h-5 w-5 -mx-2 text-slate-300" />
                </div>

                {/* Tombol kecil di kanan bawah (dummy icon) */}
                <button
                    type="button"
                    className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-lg bg-white/90 text-slate-700 shadow"
                    title="Ulangi"
                >
                    <RefreshCw className="h-5 w-5" />
                </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 flex items-center gap-3 overflow-x-auto pb-1">
                {thumbs.map((t, i) => (
                    <img
                        key={i}
                        src={t}
                        alt={`thumb-${i}`}
                        className="h-16 w-16 shrink-0 rounded-xl object-cover ring-2 ring-white"
                    />
                ))}
            </div>

            {/* Handle kecil menunjuk ke bottom sheet */}
            <div className="mt-3 flex w-full justify-center">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-white shadow">
                    <ChevronUp className="h-5 w-5 text-slate-600" />
                </div>
            </div>
        </div>
    )
}

type LocationCardProps = {
    status: GeoStatus
    coords: Coords | null
    address: Address | null
    updatedAt: Date | null
    onRefresh: () => void
    onCopy: () => void
    onClear: () => void
}

const LocationCard: React.FC<LocationCardProps> = ({
    status,
    coords,
    address,
    updatedAt,
    onRefresh,
    onCopy,
    onClear,
}) => {
    const timeStr = updatedAt
        ? updatedAt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        : "--:--"

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Fake-map preview */}
            <div className="h-40 w-full overflow-hidden rounded-t-2xl">
                <img
                    src="https://maps.gstatic.com/tactile/pane/default_geographic.png"
                    alt="Map"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-semibold">Your Location</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{timeStr} WIB</span>
                    </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                    {status === "locating" && <span>Mencari lokasi…</span>}
                    {status === "error" && (
                        <span className="text-red-600">Gagal membaca lokasi. Coba izinkan GPS.</span>
                    )}
                    {status === "ready" && (
                        <>
                            <div className="line-clamp-2">
                                {address?.display || `${coords?.lat}, ${coords?.lon}`}
                            </div>
                            <div className="mt-2 inline-flex items-center gap-2">
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-700">
                                    {address?.city || "Kota"}
                                </span>
                                {address?.state && (
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                        {address.state}
                                    </span>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={onRefresh}
                        className="rounded-full bg-sky-600 px-4 py-1.5 text-sm font-semibold text-white shadow active:scale-95"
                    >
                        Bogor
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onCopy}
                            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50"
                            title="Copy address"
                        >
                            <Copy className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={onClear}
                            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50"
                            title="Clear"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

type BottomFormProps = {
    open: boolean
    setOpen: (v: boolean) => void
    // location
    status: GeoStatus
    coords: Coords | null
    address: Address | null
    updatedAt: Date | null
    refreshLocation: () => void
    clearLocation: () => void
}

const BottomForm: React.FC<BottomFormProps> = ({
    open,
    setOpen,
    status,
    coords,
    address,
    updatedAt,
    refreshLocation,
    clearLocation,
}) => {
    const [anonymous, setAnonymous] = useState(true)
    const [name, setName] = useState("")
    const [notes, setNotes] = useState("")

    const copyAddress = async () => {
        const text =
            address?.display ??
            (coords ? `${coords.lat}, ${coords.lon}` : "—")
        try {
            await navigator.clipboard.writeText(text)
        } catch {
            /* no-op */
        }
    }

    return (
        <Drawer.Root
            open={open}
            onOpenChange={setOpen}
            dismissible
            modal={false}
        >
            <Drawer.Overlay className="fixed inset-0 bg-black/20" />
            <Drawer.Portal>
                <Drawer.Content
                    className="
                        fixed inset-x-0 bottom-0 z-[60]
                        mx-auto w-full max-w-[480px]
                        rounded-t-3xl bg-white shadow-2xl
                    "
                    // snap points
                    style={
                        {
                            "--initial-transform": "translateY(25vh)",
                        } as React.CSSProperties
                    }
                >
                    <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-300/80" />

                    <div className="max-h-[65vh] overflow-y-auto px-4 pb-28 pt-4">
                        <div className="mx-auto mb-2 h-1 w-20 rounded-full bg-slate-200" />
                        <h3 className="text-center text-[15px] font-semibold text-slate-800">
                            Tolong lengkapi informasi dibawah ini
                        </h3>

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
                                <label className="block text-sm font-medium text-slate-700">
                                    Your name
                                </label>
                                <input
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-100 focus:ring-4"
                                    placeholder="Nama kamu"
                                    value={anonymous ? "" : name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={anonymous}
                                />
                                <label className="mt-2 flex items-center gap-2 text-sm text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={anonymous}
                                        onChange={(e) => setAnonymous(e.target.checked)}
                                        className="h-4 w-4 accent-sky-600"
                                    />
                                    Anonim
                                </label>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">
                                    Describing your thought (Optional)
                                </label>
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

                    {/* Sticky CTA di dalam sheet */}
                    <div className="pointer-events-auto absolute inset-x-0 bottom-0 bg-white/95 p-4 backdrop-blur">
                        <button
                            type="button"
                            className="w-full rounded-2xl bg-sky-600 py-3.5 text-white shadow-lg shadow-sky-600/30 active:scale-[0.98]"
                            onClick={() => {
                                // contoh submit
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

const StickyPageCTA: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center">
        <div className="pointer-events-auto w-full max-w-[480px] px-4">
            <button
                onClick={onClick}
                className="w-full rounded-2xl bg-sky-600 py-3.5 text-white shadow-lg shadow-sky-600/30 active:scale-[0.98]"
            >
                Isi Data
            </button>
        </div>
    </div>
)

/* ============================================================================
 * Main Page
 * ==========================================================================*/

export default function ScanDetails() {
    // bottom sheet selalu terbuka
    const [open, setOpen] = useState(false)

    const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle")
    const [coords, setCoords] = useState<Coords | null>(null)
    const [addr, setAddr] = useState<Address | null>(null)
    const [updatedAt, setUpdatedAt] = useState<Date | null>(null)

    const askLocation = async () => {
        setGeoStatus("locating")
        setAddr(null)
        try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 12000,
                    maximumAge: 0,
                })
            })
            const c = { lat: pos.coords.latitude, lon: pos.coords.longitude }
            setCoords(c)
            const a = await reverseGeocode(c)
            setAddr(a)
            setGeoStatus("ready")
            setUpdatedAt(new Date())
        } catch (e) {
            console.error(e)
            setGeoStatus("error")
        }
    }

    const clearLocation = () => {
        setCoords(null)
        setAddr(null)
        setUpdatedAt(null)
        setGeoStatus("idle")
    }

    useEffect(() => {
        askLocation()
    }, [])


    return (
        <div className="min-h-screen w-full bg-[#0da0ff] pb-28 text-slate-900">
            <HeaderBar />
            <MediaPreview />

            {/* Sticky CTA di halaman (di luar sheet) */}
            <StickyPageCTA onClick={() => setOpen(true)} />

            {/* Bottom sheet (drag/scroll, non-dismissible, auto-open) */}
            <div className="mx-auto w-full max-w-[480px]">
                <BottomForm
                    open={open}
                    setOpen={setOpen}
                    status={geoStatus}
                    coords={coords}
                    address={addr}
                    updatedAt={updatedAt}
                    refreshLocation={askLocation}
                    clearLocation={clearLocation}
                />
            </div>
        </div>
    )
}

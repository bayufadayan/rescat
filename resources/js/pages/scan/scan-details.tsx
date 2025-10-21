import React, { useEffect, useState } from "react"
import HeaderBar from "@/components/scan/details/header-bar"
import MediaPreview from "@/components/scan/details/media-preview"
import BottomForm from "@/components/scan/details/bottom-form"
import StickyPageCTA from "@/components/scan/details/sticky-page-cta"
import type { Coords, GeoStatus, Address } from "@/types/geo"
import { reverseGeocode } from "@/lib/helper/reverse-geocode"

export default function ScanDetails() {
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

            <StickyPageCTA onClick={() => setOpen(true)} />

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

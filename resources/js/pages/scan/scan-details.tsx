import React, { useEffect, useState } from "react";
import MediaPreview from "@/components/scan/details/media-preview";
import BottomForm from "@/components/scan/details/bottom-form";
import type { Coords, GeoStatus, Address } from "@/types/geo";
import { reverseGeocode } from "@/lib/helper/reverse-geocode";
import SideForm from "@/components/scan/details/side-form";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ScanDetails() {
    const isMobile = useIsMobile(); // ✅ gunakan hook kamu yang sudah ada
    const [open, setOpen] = useState(true);

    const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
    const [coords, setCoords] = useState<Coords | null>(null);
    const [addr, setAddr] = useState<Address | null>(null);
    const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

    const askLocation = async () => {
        setGeoStatus("locating");
        setAddr(null);
        try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 12000,
                    maximumAge: 0,
                });
            });
            const c = { lat: pos.coords.latitude, lon: pos.coords.longitude };
            setCoords(c);
            const a = await reverseGeocode(c);
            setAddr(a);
            setGeoStatus("ready");
            setUpdatedAt(new Date());
        } catch (e) {
            console.error(e);
            setGeoStatus("error");
        }
    };

    const clearLocation = () => {
        setCoords(null);
        setAddr(null);
        setUpdatedAt(null);
        setGeoStatus("idle");
    };

    useEffect(() => {
        askLocation();
    }, []);

    return (
        <div className="min-h-dvh w-full bg-[#0da0ff] text-slate-900 flex justify-center">
            <div className="w-full justify-between min-h-dvh">
                <div className="flex w-full h-full flex-col justify-center items-center lg:flex-row lg:items-start lg:justify-center px-4 pt-16 lg:px-0 lg:pt-0">
                    {/* Left / main visual */}
                    <div className="flex-1 flex items-center justify-center h-full">
                        <MediaPreview />
                    </div>

                    {isMobile && (
                        <div className="flex flex-1 px-0">
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
                    )}

                    {!isMobile && (
                        <div className="hidden md:flex flex-1 justify-center items-center">
                            <SideForm
                                status={geoStatus}
                                coords={coords}
                                address={addr}
                                updatedAt={updatedAt}
                                refreshLocation={askLocation}
                                clearLocation={clearLocation}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

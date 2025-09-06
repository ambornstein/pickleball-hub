'use client'

import mapboxgl, { LngLatLike, Map, Marker } from "mapbox-gl";
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom";

interface MarkerProps {
    location: any,
    map: any,
    isActive: boolean,
    onClick: (element: any) => void
}

export default function MarkerElement(props: MarkerProps) {
    const markerRef = useRef<Marker>(null);
    const contentRef = useRef(document.createElement('div'));

    useEffect(() => {
        markerRef.current = new mapboxgl.Marker(contentRef.current)
            .setLngLat(props.location.coordinates)
            .addTo(props.map);
    }, [])

    return (<>
        {createPortal(
            <div className="bg-background py-0.5 px-1 rounded-md text-[14px] tracking-tight font-standard" onClick={() => props.onClick(props.location)}>
                {props.location.name}
            </div>,
            contentRef.current
        )}
    </>
    )
}
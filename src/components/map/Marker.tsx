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

        return () => {
            markerRef.current?.remove();
        }
    }, [])

    return (<>
        {createPortal(
            <div className="bg-background p-2 rounded-md text-[16px] font-standard" onClick={() => props.onClick(props.location)}>
                {props.location.name}
            </div>,
            contentRef.current
        )}
    </>
    )
}
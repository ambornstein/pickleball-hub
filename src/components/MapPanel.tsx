'use client'

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"

export default function MapPanel() {
    const mapContainer = useRef<any>(null)
    const map = useRef<mapboxgl.Map | null>(null)

    const [lng, setLng] = useState("-70.9");
    const [lat, setLat] = useState("42.35");
    const [zoom, setZoom] = useState("9");

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYW1ib3Juc3RlaW4iLCJhIjoiY2x3ajhnYjBjMHk1cDJrbXdjZHdqaWZ3cyJ9._K7RJ6SvA6Tg2VtuZjfCig'

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [Number(lng), Number(lat)],
            zoom: Number(zoom)
        })

        map.current.on('move', () => {
            setLng(map.current!.getCenter().lng.toFixed(4));
            setLat(map.current!.getCenter().lat.toFixed(4));
            setZoom(map.current!.getZoom().toFixed(4));
        });

        return () => { map.current?.remove() }

    }, [])

    return (
        <div ref={mapContainer}>
            <div>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
        </div>
    )
}
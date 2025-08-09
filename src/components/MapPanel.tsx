'use client'

import { useEffect, useRef, useState } from "react"
import Location from "@/lib/models/location"
import mapboxgl, { LngLatLike } from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'; 

export default function MapPanel() {
    const mapContainer = useRef<any>(null)
    const map = useRef<mapboxgl.Map | null>(null)

    const [lng, setLng] = useState("-70.9");
    const [lat, setLat] = useState("42.35");
    const [zoom, setZoom] = useState("9");

    const getLocations = async () => {
        const loc = await fetch('/api/location');
        const j = await loc.json();
        return j;
    }

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

        getLocations().then((res) => {
            res.map((location: { coordinates: LngLatLike }) => {
                console.log(location.coordinates)
                return new mapboxgl.Marker().setLngLat(location.coordinates).addTo(map.current!)
            })
        })

        return () => { map.current?.remove() }

    }, [])

    return (
        <div className="h-[70vh]" ref={mapContainer}>
            <div className="fixed z-10 pointer-events-none bg-gray-600 rounded-md p-2 m-2 font-standard text-md">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
        </div>
    )
}
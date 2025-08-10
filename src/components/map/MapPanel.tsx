'use client'

import { useEffect, useRef, useState } from "react"
import Location from "@/lib/models/location"
import mapboxgl, { LngLatLike } from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import MarkerElement from "./Marker";
import PopupElement from "./Popup";

export default function MapPanel() {
    const mapContainer = useRef<any>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState<any>()

    const [lng, setLng] = useState(-95.3321);
    const [lat, setLat] = useState(29.77);
    const [zoom, setZoom] = useState(9.5);

    const getLocations = async () => {
        const loc = await fetch('/api/location');
        const json = await loc.json();

        setLocations(json);
    }

    useEffect(() => {
        const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        mapboxgl.accessToken = 'pk.eyJ1IjoiYW1ib3Juc3RlaW4iLCJhIjoiY2x3ajhnYjBjMHk1cDJrbXdjZHdqaWZ3cyJ9._K7RJ6SvA6Tg2VtuZjfCig'

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: darkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/standard',
            center: [lng, lat],
            zoom: zoom
        })

        map.current.on('move', () => {
            setLng(map.current!.getCenter().lng);
            setLat(map.current!.getCenter().lat);
            setZoom(map.current!.getZoom());
        });

        getLocations()

        return () => { map.current?.remove() }

    }, [])

    const selectLocation = (location: any) => setSelectedLocation(location)

    return (<>
        <div className="search-view" ref={mapContainer}>
            <div className="sticky w-fit z-10 bg-gray-700 rounded-md p-2 m-2 font-standard text-[16px]">
                Longitude: {lng.toFixed(2)} | Latitude: {lat.toFixed(2)} | Zoom: {zoom.toFixed(1)}
            </div>

        </div>
        {map.current && locations && locations.map((loc: any) => {
            return <MarkerElement key={loc._id} map={map.current} location={loc} isActive={false} onClick={selectLocation} />
        })}
        {map.current && selectedLocation && (
            <PopupElement map={map.current} activeLocation={selectedLocation} />
        )}
    </>)
}
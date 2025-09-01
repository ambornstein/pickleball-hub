'use client'

import FilterSidebar from "@/components/FilterSidebar";
import MapPanel from "@/components/map/MapPanel";
import ReviewSidebar from "@/components/ReviewSidebar";
import { useEffect, useState } from "react";

export default function SearchPage() {
    const [locations, setLocations] = useState([])
    /* false -> Map state (default)
       true -> List state           */
    const [viewToggle, setViewToggle] = useState(false)
    const [loading, setLoading] = useState(true)

    const getLocations = async () => {
        const loc = await fetch('/api/location');
        const json = await loc.json();

        setLocations(json);
        setLoading(false)
    }

    useEffect(() => {
        getLocations()
    }, [])

    if (loading) return null

    return (
        <main className="flex flex-col items-center gap-4">
            <div className="relative inline-flex bg-slate-800 rounded-md p-1 outline-2 cursor-pointer">
                <input type="checkbox" value="" onChange={(e) => setViewToggle(e.target.checked)} className="absolute appearance-none w-full h-full peer z-10" />
                <div className="grid grid-cols-[50px_50px] gap-[12px] place-items-center peer text-lg lg:text-xl
                    after:transition-all after:absolute after:w-[56px] after:h-[36px] after:left-0 after:rounded-md after:bg-slate-400/40 after:outline-1
                    peer-checked:after:translate-x-[64px]">
                    <span>Map</span>
                    <span>List</span>
                </div>
            </div>

            <div className="flex flex-col gap-y-4 gap-x-4 h-[70vh] w-full
                lg:gap-y-8 lg:flex-none lg:grid lg:grid-cols-[auto_60vw_auto] lg:grid-rows-[36px_auto]">
                <FilterSidebar />
                {viewToggle ? <div className="bg-stone-900 search-view"></div> : <MapPanel locations={locations} />}
                <ReviewSidebar />
            </div>
        </main>
    )
}
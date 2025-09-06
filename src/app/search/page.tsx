'use client'

import FilterSidebar from "@/components/FilterSidebar";
import MapPanel from "@/components/map/MapPanel";
import ReviewSidebar from "@/components/ReviewSidebar";
import ToggleChip from "@/components/ToggleChip";
import { useState } from "react";

export default function SearchPage() {
    /* false -> Map state (default)
       true -> List state           */
    const [viewToggle, setViewToggle] = useState(false)

    return (
        <main className="flex flex-col items-center gap-4">
            <ToggleChip value1="Map" value2="List" setToggle={setViewToggle} />

            <div className="flex flex-col gap-y-4 gap-x-4 h-auto w-full
                lg:gap-y-8 lg:flex-none lg:grid lg:grid-cols-[auto_60vw_auto] lg:grid-rows-[36px_auto]">
                <FilterSidebar />
                {viewToggle ? <div className="bg-stone-900 search-view"></div> : <MapPanel />}
                <ReviewSidebar />
            </div>
        </main>
    )
}
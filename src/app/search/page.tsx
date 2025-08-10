'use client'

import FilterSidebar from "@/components/FilterSidebar";
import HeaderBar from "@/components/HeaderBar";
import MapPanel from "@/components/map/MapPanel";
import ReviewSidebar from "@/components/ReviewSidebar";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchPage() {
    /* false -> Map state (default)
       true -> List state           */
    const [viewToggle, setViewToggle] = useState(false)

    return (
        <div className="min-h-screen font-standard">
            <HeaderBar />
            <main className="flex flex-col items-center gap-4">
                <div className="relative inline-flex bg-slate-800 rounded-md px-2 py-2 outline-2 cursor-pointer">
                    <input type="checkbox" value="" onChange={(e) => setViewToggle(e.target.checked)} className="absolute appearance-none w-full h-full peer z-10" />
                    <div className="grid grid-cols-[50px_50px] gap-[20px] place-items-center peer text-2xl
                    after:transition-all after:absolute after:w-[65px] after:h-[48px] after:left-0 after:rounded-md after:bg-slate-400/40 after:outline-1
                    peer-checked:after:translate-x-[70px]">
                        <span>Map</span>
                        <span>List</span>
                    </div>
                </div>

                <div className="flex flex-col gap-y-4 gap-x-4 h-[70vh] w-full
                lg:gap-y-8 lg:flex-none lg:grid lg:grid-cols-[auto_60vw_auto] lg:grid-rows-[36px_auto]">
                    <div className="flex items-center gap-4 col-start-2 px-4 lg:px-0">
                        <input className="w-full h-12 input-text bg-stone-800" type="text" />
                        <BiSearch className="w-12 h-12 bg-stone-700 p-2 rounded-lg" />
                    </div>
                    <FilterSidebar />
                    {viewToggle ? <div className="bg-stone-900 search-view"></div> : <MapPanel />}
                    <ReviewSidebar />
                </div>
            </main>
        </div>
    )
}
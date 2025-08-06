'use client'

import FilterSidebar from "@/components/FilterSidebar";
import HeaderBar from "@/components/HeaderBar";
import MapPanel from "@/components/MapPanel";
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
                <div className="relative inline-flex bg-slate-800 rounded-md px-2 py-2 outline-2">
                    <input type="checkbox" value="" onChange={(e) => setViewToggle(e.target.checked)} className="absolute cursor-pointer appearance-none w-full h-full peer z-10" />
                    <div className="grid grid-cols-[50px_50px] gap-[20px] place-items-center peer text-2xl
                    after:transition-all after:absolute after:w-[65px] after:h-[48px] after:left-0 after:rounded-md after:bg-white/40 after:outline-1
                    peer-checked:after:translate-x-[70px]">
                        <span>Map</span>
                        <span>List</span>
                    </div>
                </div>

                <div className="grid grid-cols-[320px_auto_320px] grid-rows-[36px_auto] gap-y-8 w-full h-[650px]">
                    <div className="flex items-center gap-12 col-start-2 h-full">
                        <input className="w-full h-12 bg-stone-900" type="text" />
                        <BiSearch className="text-4xl bg-stone-900" />
                    </div>
                    <FilterSidebar/>
                    {viewToggle ? <div className="bg-stone-900"></div> : <MapPanel/>}
                    <ReviewSidebar/>
                </div>
            </main>
        </div>
    )
}
'use client'
import { useState } from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

export default function FilterSidebar() {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="w-full flex flex-row-reverse col-start-1 justify-end overflow-clip">
            <div className="w-12 h-12 -translate-x-10 -z-10">
                {expanded ?
                    <CgChevronLeft className="text-4xl absolute" /> :
                    <CgChevronRight className="text-4xl absolute" />}
            </div>
            <input type="checkbox" onChange={(e) => setExpanded(e.target.checked)}
                className="peer h-12 w-12 z-10 appearance-none" />
            <div className="w-full bg-slate-700 peer-checked:w-0 overflow-hidden transition-all duration-300">
                <h2>Filters</h2>
            </div>
        </div>
    )
}
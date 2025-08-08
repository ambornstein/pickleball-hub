'use client'
import { useState } from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

export default function FilterSidebar() {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="flex flex-row-reverse col-start-1 justify-end">
            <div className="w-12 h-12 peer bg-indigo-900 rounded-e-md">
                <input type="checkbox" onChange={(e) => setExpanded(e.target.checked)}
                    className="w-12 h-12 z-10 appearance-none absolute" />
                {expanded ?
                    <CgChevronLeft className="w-12 h-12 absolute" /> :
                    <CgChevronRight className="w-12 h-12 absolute" />}
            </div>

            <div className="w-xs bg-slate-700 peer-[:has(:checked)]:w-0 overflow-hidden transition-all duration-500 rounded-s-2xl">
                <h3 className="float-left pl-4 mt-1 text-2xl">Filters</h3>
            </div>
        </div>
    )
}
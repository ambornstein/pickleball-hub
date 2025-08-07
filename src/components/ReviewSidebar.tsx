'use client'
import { useState } from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

export default function ReviewSidebar() {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="w-full flex flex-row justify-end">
            <div className="mt-1 w-12 h-12 translate-x-9 -z-10">
                {expanded ?
                    <CgChevronRight className="text-4xl absolute" /> :
                    <CgChevronLeft className="text-4xl absolute" />}
            </div>
            <input type="checkbox" onChange={(e) => setExpanded(e.target.checked)}
                className="peer mt-1 h-12 w-12 z-10 appearance-none" />
            <div className="w-full bg-slate-700 peer-checked:w-0 overflow-hidden transition-all duration-300">
                <h3 className="float-right pr-4 mt-1 text-2xl">Reviews</h3>
            </div>
        </div>
    )
}
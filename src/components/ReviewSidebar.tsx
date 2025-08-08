'use client'
import { useState } from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

export default function ReviewSidebar() {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="w-full flex flex-row justify-end">
            <div className="peer w-12 h-12">
                <input type="checkbox" onChange={(e) => setExpanded(e.target.checked)}
                    className="w-12 h-12 z-10 appearance-none absolute" />
                {expanded ?
                    <CgChevronRight className="w-12 h-12 absolute" /> :
                    <CgChevronLeft className="w-12 h-12 absolute" />}
            </div>

            <div className="w-xs bg-slate-700 peer-[:has(:checked)]:w-0 overflow-hidden transition-all duration-500 rounded-e-md">
                <h3 className="float-right pr-4 mt-1 text-2xl">Reviews</h3>
            </div>
        </div>
    )
}
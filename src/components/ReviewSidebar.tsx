'use client'
import { useState } from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

export default function ReviewSidebar() {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="w-full flex flex-row justify-end z-20">
            <div className="peer w-12 h-12 bg-slate-800 rounded-s-md">
                <input type="checkbox" onChange={(e) => setExpanded(e.target.checked)}
                    className="w-12 h-12 appearance-none absolute z-30" />
                {expanded ?
                    <CgChevronRight className="w-12 h-12 absolute" /> :
                    <CgChevronLeft className="w-12 h-12 absolute" />}
            </div>

            <div className="w-xs max-w-[80vw] bg-slate-800 peer-[:has(:checked)]:w-0 overflow-hidden transition-all duration-500 rounded-e-2xl">
                <h3 className="float-right pr-4 mt-1 text-2xl">Reviews</h3>
            </div>
        </div>
    )
}
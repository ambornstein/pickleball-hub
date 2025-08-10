'use client'
import { useEffect, useState } from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

export default function FilterSidebar() {
    const [collapsed, setExpanded] = useState(false)

    useEffect(() => {
        setExpanded(window.matchMedia('(width <= 64rem)').matches)
    }, [])

    return (
        <div className="flex flex-row-reverse lg:col-start-1 lg:relative fixed justify-end z-30 h-[70vh] mt-32 lg:mt-0">
            <div className="w-12 h-12 peer bg-slate-800 rounded-e-md">
                <input type="checkbox" checked={collapsed} onChange={(e) => setExpanded(e.target.checked)}
                    className="w-12 h-12 appearance-none absolute z-20" />
                {collapsed ?
                    <CgChevronRight className="w-12 h-12 absolute" /> :
                    <CgChevronLeft className="w-12 h-12 absolute" />}
            </div>

            <div className="w-xs max-w-[80vw] bg-slate-800 peer-[:has(:checked)]:w-0 overflow-hidden transition-all duration-500 rounded-s-2xl z-100">
                <h3 className="float-left pl-4 mt-1 text-2xl">Filters</h3>
            </div>
        </div>
    )
}
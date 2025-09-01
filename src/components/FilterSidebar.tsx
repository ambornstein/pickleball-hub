import FoldingButton from "./FoldingButton"

export default function FilterSidebar() {
    return (
        <div className="flex flex-row-reverse lg:relative fixed justify-end z-30 h-[70vh] mt-12 lg:mt-0">
            <FoldingButton orientation="left"/>

            <div className="w-xs max-w-[80vw] bg-slate-800 peer-[:has(:checked)]:w-0 overflow-hidden transition-all duration-500 rounded-s-2xl z-100">
                <h3 className="float-left pl-4 mt-1 text-2xl">Filters</h3>
            </div>
        </div>
    )
}
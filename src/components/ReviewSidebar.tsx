import FoldingButton from "./FoldingButton";

export default function ReviewSidebar() {
    return (
        <div className="w-full flex flex-row justify-end z-20">
            <FoldingButton orientation="right" />

            <div className="w-xs max-w-[80vw] bg-slate-800 peer-[:has(:checked)]:w-0 overflow-hidden transition-all duration-500 rounded-e-2xl">
                <h3 className="float-right pr-4 mt-1 text-2xl">Reviews</h3>
            </div>
        </div>
    )
}
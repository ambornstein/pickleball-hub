import { loremExplainer } from "@/lib/config";

export default function LinkScroll() {
    return (
        <div className="overflow-hidden w-fit animate-[infinite-scroll-forward_25s_linear_infinite] text-md lg:text-lg">
            <div className="link link-scrolling">{loremExplainer} {loremExplainer}</div>
        </div>
    )
}
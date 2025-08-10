import { loremExplainer } from "@/lib/config";

export default function LinkScroll() {
    return (
        <div className="overflow-hidden w-fit animate-[infinite-scroll-reverse_25s_linear_infinite] text-xl">
            <div className="link link-scrolling">{loremExplainer} {loremExplainer}</div>
        </div>
    )
}
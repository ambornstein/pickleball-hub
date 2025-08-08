import { loremExplainer } from "@/lib/config";

export default function LinkScroll() {
    return (
        <div className="overflow-x-hidden w-fit flex animate-[infinite-scroll-reverse_25s_linear_infinite]">
            <div className="link link-scrolling">{loremExplainer} {loremExplainer}</div>
        </div>
    )
}
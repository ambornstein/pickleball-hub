import { loremExplainer } from "@/lib/config";
import ReviewFull from "./ReviewFull";

export default function ReviewSection() {
    return (
        <div className="flex flex-col p-5 gap-4 bg-emerald-950 container">
            <h3 className="text-2xl">Reviews</h3>
            <ReviewFull reviewerName="Jerry" rating={4} date={new Date(Date.now())} content="This place is ok" />
            <ReviewFull reviewerName="Jerry" rating={1} date={new Date(Date.now())} content={loremExplainer} />
        </div>)
}
import { CgProfile } from "react-icons/cg"
import StarRating from "../StarRating"

export interface ReviewProps {
    rating: number,
    reviewerName: string,
    date: Date
    content: string
}

export default function ReviewFull(props: ReviewProps) {

    return (
        <div className="w-full h-fit flex flex-col gap-2 rounded-md p-2 bg-emerald-700">
            <div className="flex flex-row items-center gap-2">
                <CgProfile className="text-xl" />
                <span className="text-xl">{props.reviewerName}</span>
                <span className="ml-auto float-left">{props.date.toLocaleDateString('en-US', {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}</span>
            </div>
            <StarRating value={props.rating} />
            <p>{props.content}</p>
        </div>
    )
}
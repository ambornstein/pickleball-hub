import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function StarRating({ value }: { value: number }) {
    return (
        <div className="flex flex-row gap-2">
            {Array.from({ length: 5 }, (_, i) => 
                (i < value) ? <AiFillStar key={i}/> : <AiOutlineStar key={i}/>)
            }
        </div>
    )
}
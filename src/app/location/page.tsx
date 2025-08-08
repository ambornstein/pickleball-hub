import HeaderBar from "@/components/HeaderBar";
import ReviewFull from "@/components/ReviewFull";
import { loremExplainer } from "@/lib/config";

export default function LocationPage() {
    return (
        <div className="min-h-screen font-standard">
            <HeaderBar />
            <main className="flex flex-col gap-4 items-center">
                <div className="sm:w-md md:w-lg h-fit min-h-[450px] flex flex-col gap-4 p-12 bg-blue-950"></div>
                <div className="flex flex-col w-lg p-5 gap-4 bg-emerald-950">
                    <h3 className="text-2xl">Reviews</h3>
                    <ReviewFull reviewerName="Jerry" rating={4} date={new Date(Date.now())} content="This place is ok" />
                    <ReviewFull reviewerName="Jerry" rating={1} date={new Date(Date.now())} content={loremExplainer} />
                </div>
            </main>
        </div>
    )
}
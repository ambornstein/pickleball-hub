'use client'

import HeaderBar from "@/components/HeaderBar";
import ReviewFull from "@/components/ReviewFull";
import { loremExplainer } from "@/lib/config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LocationPage() {
    const [location, setLocation] = useState<any>(null)
    const { id } = useParams();

    const getLocation = async() => {
        const loc = await fetch(`/api/location/?id=${id}`);
        const data = await loc.json();

        console.log(data)
        setLocation(data);
    }

    useEffect( () => {
        getLocation()
    }, [])

    return (
        <div className="min-h-screen font-standard">
            <HeaderBar />
            <main className="flex flex-col gap-4 items-center">
                <div className="sm:w-md md:w-lg h-fit min-h-[450px] flex flex-col gap-4 p-12 bg-blue-950">
                    <h2>{location?.name}</h2>
                </div>
                <div className="flex flex-col w-lg p-5 gap-4 bg-emerald-950">
                    <h3 className="text-2xl">Reviews</h3>
                    <ReviewFull reviewerName="Jerry" rating={4} date={new Date(Date.now())} content="This place is ok" />
                    <ReviewFull reviewerName="Jerry" rating={1} date={new Date(Date.now())} content={loremExplainer} />
                </div>
            </main>
        </div>
    )
}
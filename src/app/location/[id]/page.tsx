'use client'

import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LocationPage() {
    const [location, setLocation] = useState<any>(null)
    const { id } = useParams();

    const getLocation = async () => {
        const loc = await fetch(`/api/location/${id}`);
        const data = await loc.json();

        console.log(data)
        setLocation(data);
    }

    useEffect(() => {
        getLocation()
    }, [])

    return (
        <DetailPageLayout>
            <div className="block m-auto w-lg bg-amber-700 p-4">
                <h3>{location?.name}</h3>
                <p>{location?.address}</p>
                <a className="link" href={location?.url}><p>{location?.url}</p></a>
                <p>{location?.phoneNumber}</p>
            </div>
        </DetailPageLayout>
    )
}
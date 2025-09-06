'use client'

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";

const convertTime = (hourNum: number) => {
    if (hourNum == 0) return "12 AM"
    else if (hourNum > 12) return `${hourNum - 12} PM`
    else return (`${hourNum} AM`)
}

function BooleanChip({ label, boolValue }: { label: string, boolValue: boolean }) {
    return (
        <div className={`${boolValue ? "bg-emerald-700" : "bg-rose-700"} flex flex-col items-center`}>
            <h3>{label}</h3>
            <span className="*:size-8">{boolValue ? <BiCheck /> : <BiX />}</span>
        </div>
    )
}

export default function LocationPage() {
    const [location, setLocation] = useState<Venue>()
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

    if (location == undefined) return null
    return (
        <div className="m-auto px-4 py-2 flex flex-col gap-4 bg-stone-600 w-2xl">
            <div className="m-auto w-lg">
                <div className="flex justify-around">
                    <Image src="/globe.svg" height={100} width={100} alt="placeholder" />
                    <div>
                        <h2>{location?.name}</h2>
                        <a className="link" href={location?.url}><p>{location?.url}</p></a>
                        <p>{location?.address}, {location?.zipcode}</p>
                        <p>{location?.phoneNumber}</p>
                    </div>
                </div>
                <hr className="my-4" />
                <p>{location?.description}</p>
            </div>
            <div className="m-auto flex gap-4 mt-4 *:rounded-md *:bg-stone-700 *:p-4">
                <div className="flex flex-col items-center">
                    <h3>Outdoor Courts</h3>
                    <p>{location?.outdoorCourts ?? '???'}</p>
                </div>
                <div className="flex flex-col items-center">
                    <h3>Indoor Courts</h3>
                    <p>{location?.indoorCourts ?? '???'}</p>
                </div>
            </div>
            <div className="m-auto flex gap-4 w-fit justify-around *:rounded-md *:bg-stone-700 *:p-4">
                <div>
                    <h3>Weekday</h3>
                    {location?.schedule.weekday &&
                        <p>{`${convertTime(location!.schedule.weekday!.openTime)} — ${convertTime(location!.schedule.weekday!.closeTime)}`}</p>}
                </div>
                <div>
                    <h3>Saturday</h3>
                    {location?.schedule.saturday &&
                        <p>{`${convertTime(location!.schedule.saturday!.openTime)} — ${convertTime(location!.schedule.saturday!.closeTime)}`}</p>}
                </div>
                <div>
                    <h3>Sunday</h3>
                    {location?.schedule.sunday &&
                        <p>{`${convertTime(location!.schedule.sunday!.openTime)} — ${convertTime(location!.schedule.sunday!.closeTime)}`}</p>}
                </div>
            </div>
            <div className="m-auto flex gap-4 *:rounded-md *:p-4">
                <BooleanChip label="Open Play" boolValue={location?.openPlay!} />
                <BooleanChip label="Lessons" boolValue={location?.lessons!} />
                <BooleanChip label="Reservations" boolValue={location?.reservations!} />
            </div>
        </div>
    )
}
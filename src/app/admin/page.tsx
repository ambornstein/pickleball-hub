'use client'

import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import LocationForm from "@/components/LocationForm";
import Modal from "@/components/Modal";
import { extractFormJSON } from "@/lib/utils";
import { FormEvent, useEffect, useState } from "react";
import { BiCheck, BiEdit, BiTrash, BiX } from "react-icons/bi";

const BooleanCell = ({ value }: { value: boolean }) => (
    <td className="*:m-auto">{value ? <BiCheck /> : <BiX />}</td>
)

export default function AdminPage() {
    const [locations, setLocations] = useState<Venue[]>()
    const [stagedLocations, setStagedLocations] = useState<Venue[]>()
    const [selectedLocation, setSelectedLocation] = useState<Venue>()

    useEffect(() => {
        fetchLocations()
    }, [])

    const fetchLocations = () => {
        fetch('api/location').then(res => res.json()).then(data => setLocations(data))
        fetch('api/pending-location').then(res => res.json()).then(data => setStagedLocations(data))
    }

    const deleteLocation = (index: number) => {
        const id = locations![index]._id

        fetch(`api/location/${id}`, { method: "DELETE" })

        setLocations(locations?.filter(l => l._id != id))
    }

    const updateLocation = (e: FormEvent) => {
        e.preventDefault();

        const formData = extractFormJSON(e)

        delete formData.zipcode

        fetch(`api/location/${selectedLocation!._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        setSelectedLocation(undefined)

        fetchLocations()
    }

    const approvePendingLocation = (id: string)  => {
        fetch(`api/pending-location/${id}`, {
            method: "PATCH"
        }).then(() => fetchLocations())
    }

    return (
        <DetailPageLayout>
            <div className="flex flex-col gap-4 items-center">
                <div className="w-fit bg-slate-700">
                    <table className="border-spacing-1 border-separate
                [&_td]:border [&_td]:border-slate-500 [&_td]:text-nowrap [&_th]:text-nowrap [&_td]:max-w-[200px] [&_td]:p-1 [&_td]:truncate">
                        <caption>Existing Locations</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Site</th>
                                <th>Zipcode</th>
                                <th>Open Play</th>
                                <th>Reservations</th>
                                <th>Lessons</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations?.map((loc, index) =>
                                <tr key={loc._id}>
                                    <td>{loc.name}</td>
                                    <td>{loc.address}</td>
                                    <td>{loc.url}</td>
                                    <td>{loc.zipcode}</td>
                                    <BooleanCell value={loc.openPlay} />
                                    <BooleanCell value={loc.reservations} />
                                    <BooleanCell value={loc.lessons} />
                                    <td className="*:inline *:size-6">
                                        <BiEdit onClick={() => setSelectedLocation(loc)} />
                                        <BiTrash onClick={() => deleteLocation(index)} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="w-fit bg-slate-700">
                    <table className="border-spacing-1 border-separate
                [&_td]:border [&_td]:border-slate-500 [&_td]:text-nowrap [&_th]:text-nowrap [&_td]:max-w-[200px] [&_td]:p-1 [&_td]:truncate">
                        <caption>Locations for Review</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Site</th>
                                <th>Zipcode</th>
                                <th>Open Play</th>
                                <th>Reservations</th>
                                <th>Lessons</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stagedLocations?.map((loc, index) =>
                                <tr key={loc._id}>
                                    <td>{loc.name}</td>
                                    <td>{loc.address}</td>
                                    <td>{loc.url}</td>
                                    <td>{loc.zipcode}</td>
                                    <BooleanCell value={loc.openPlay} />
                                    <BooleanCell value={loc.reservations} />
                                    <BooleanCell value={loc.lessons} />
                                    <td className="*:inline *:size-6">
                                        <BiCheck onClick={() => approvePendingLocation(loc._id)} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedLocation &&
                <Modal isOpen={selectedLocation != null} setIsOpen={(val) => {
                    if (!val) setSelectedLocation(undefined)
                }}>
                    <LocationForm submitAction={updateLocation} location={selectedLocation} />
                </Modal>}
        </DetailPageLayout>
    )
}
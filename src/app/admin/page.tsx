'use client'

import ApprovalTable from "@/components/admin/ApprovalTable";
import { BooleanCell } from "@/components/admin/BooleanCell";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import LocationForm from "@/components/input/LocationForm";
import Modal from "@/components/Modal";
import ScheduleForm from "@/components/admin/ScheduleForm";
import { extractFormJSON } from "@/lib/utils";
import { FormEvent, useEffect, useState } from "react";
import { BiEdit, BiFile, BiTime, BiTrash, } from "react-icons/bi";

export default function AdminPage() {
    const [locations, setLocations] = useState<Venue[]>()
    const [stagedLocations, setStagedLocations] = useState<Venue[]>()

    const [editingLocation, setEditingLocation] = useState<Venue>()
    const [editingDescription, setEditingDescription] = useState<Venue>()
    const [schedulingLocation, setSchedulingLocation] = useState<Venue>()
    const [deletingLocation, setDeletingLocation] = useState<Venue>()

    const fetchLocations = () => fetch('api/location').then(res => res.json()).then(data => setLocations(data))
    const fetchPendingLocations = () => fetch('api/pending-location').then(res => res.json()).then(data => setStagedLocations(data))

    const clearSelections = () => {
        setEditingLocation(undefined)
        setEditingDescription(undefined)
        setSchedulingLocation(undefined)
        setDeletingLocation(undefined)
    }

    useEffect(() => {
        fetchLocations()
        fetchPendingLocations()
    }, [])

    const deleteLocation = async () => {
        if (!deletingLocation) return
        const id = deletingLocation._id

        await fetch(`api/location/${id}`, { method: "DELETE" })
        setLocations(locations?.filter(l => l._id != id))

        fetchPendingLocations()
    }

    const updateLocation = async (e: FormEvent) => {
        e.preventDefault();
        if (!editingLocation) return

        const formData = extractFormJSON(e)
        delete formData.zipcode

        await fetch(`api/location/${editingLocation._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        clearSelections()
        fetchLocations()
    }

    const updateDescription = async (e:FormEvent) => {
        e.preventDefault();
        if (!editingDescription) return

        await fetch(`api/location/${editingDescription._id}`, {
            method: 'PATCH',
            body: new FormData(e.target as HTMLFormElement)
        })

        clearSelections()
        fetchLocations()
    }

    const updateSchedule = async (e: FormEvent) => {
        e.preventDefault();
        if (!schedulingLocation) return

        const formData = extractFormJSON(e)

        const data = {
            schedule: {
                weekday: {
                    openTime: Number.parseInt(formData.weekOpen.toString().slice(0, 2)),
                    closeTime: Number.parseInt(formData.weekClose.toString().slice(0, 2))
                },
                saturday: {
                    openTime: Number.parseInt(formData.satOpen.toString().slice(0, 2)),
                    closeTime: Number.parseInt(formData.satClose.toString().slice(0, 2))
                },
                sunday: {
                    openTime: Number.parseInt(formData.sunOpen.toString().slice(0, 2)),
                    closeTime: Number.parseInt(formData.sunClose.toString().slice(0, 2))
                }
            },
            outdoorCourts: formData.outdoorCourts ?? -1,
            indoorCourts: formData.indoorCourts ?? -1
        }

        await fetch(`api/location/${schedulingLocation._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        clearSelections()
        fetchLocations()
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
                                    <td className="link"><a href={loc.url}>{loc.url}</a></td>
                                    <td>{loc.zipcode}</td>
                                    <BooleanCell value={loc.openPlay} />
                                    <BooleanCell value={loc.reservations} />
                                    <BooleanCell value={loc.lessons} />
                                    <td className="*:inline *:size-6">
                                        <BiEdit onClick={() => setEditingLocation(loc)} />
                                        <BiTrash onClick={() => setDeletingLocation(loc)} />
                                        <BiTime onClick={() => setSchedulingLocation(loc)} />
                                        <BiFile onClick={() => setEditingDescription(loc)}/>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ApprovalTable refreshLocations={fetchLocations} stagedLocations={stagedLocations!} />
            </div>

            {/* Edit General Location Data */}
            <Modal isOpen={editingLocation != null} setIsOpen={clearSelections}>
                <LocationForm submitAction={updateLocation} location={editingLocation} />
            </Modal>

            {/* Edit Location Description */}
            <Modal isOpen={editingDescription != null} setIsOpen={clearSelections}>
                <h2>Description</h2>
                <form className="block" onSubmit={updateDescription}>
                    <textarea className="w-full my-4 h-48 text-input " name="description" defaultValue={editingDescription?.description}/>
                    <input className="button w-full" type="submit"/>
                </form>
            </Modal>

            {/* Edit Location Schedule */}
            <Modal isOpen={schedulingLocation != null} setIsOpen={clearSelections}>
                {schedulingLocation &&
                    <ScheduleForm schedule={schedulingLocation.schedule} submitAction={updateSchedule} outdoorCourts={schedulingLocation.outdoorCourts!} indoorCourts={schedulingLocation.indoorCourts!}/>}
            </Modal>

            {/* Confirm deletion of location */}
            <Modal isOpen={deletingLocation != null} setIsOpen={clearSelections} >
                <p>Are you sure you want to delete {deletingLocation?.name}?</p>
                <div className="flex w-full justify-between mt-12">
                    <button className="button bg-red-800 border-fuchsia-950" onClick={deleteLocation}>Confirm</button>
                    <button className="button bg-neutral-800" onClick={clearSelections}>Cancel</button>
                </div>
            </Modal>
            
        </DetailPageLayout>
    )
}
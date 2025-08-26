'use client'

import ApprovalTable from "@/components/admin/ApprovalTable";
import { BooleanCell } from "@/components/admin/BooleanCell";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { FormEvent, useEffect, useState } from "react";
import { BiEdit, BiFile, BiTime, BiTrash, } from "react-icons/bi";
import ScheduleModal from "@/components/admin/modal/ScheduleModal";
import DeleteModal from "@/components/admin/modal/DeleteModal";
import GeneralModal from "@/components/admin/modal/GeneralModal";
import DescriptionModal from "@/components/admin/modal/DescriptionModal";


export interface AdminEditModalProps { 
    editingLocation?: Venue
    clearSelection: () => void
    fetchLocations: () => void
}

export default function AdminPage() {
    const [locations, setLocations] = useState<Venue[]>()
    const [stagedLocations, setStagedLocations] = useState<Venue[]>()

    const fetchLocations = () => fetch('api/location').then(res => res.json()).then(data => setLocations(data))
    const fetchPendingLocations = () => fetch('api/pending-location').then(res => res.json()).then(data => setStagedLocations(data))

    useEffect(() => {
        fetchLocations()
        fetchPendingLocations()
    }, [])

    const [editingLocation, setEditingLocation] = useState<Venue | undefined>(undefined)
    const [editType, setEditType] = useState<'general' | 'description' | 'schedule' | 'delete'>('general')

    const clearSelection = () => {
        setEditingLocation(undefined)
    }

    const generalOperation = (loc: Venue) => {
        console.log("????")
        setEditingLocation(loc)
        setEditType('general')
    }
    const scheduleOperation = (loc: Venue) => {
        setEditingLocation(loc)
        setEditType('schedule')
    }
    const deleteOperation = (loc: Venue) => {
        setEditingLocation(loc)
        setEditType('delete')
    }
    const descriptionOperation = (loc: Venue) => {
        setEditingLocation(loc)
        setEditType('description')
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
                                <th>Location Name</th>
                                <th>Description</th>
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
                                    <td className="*:inline *:size-6" >
                                        <BiFile onClick={() => descriptionOperation(loc)} />
                                    </td>
                                    <td>{loc.address}</td>
                                    <td className="link"><a href={loc.url}>{loc.url}</a></td>
                                    <td>{loc.zipcode}</td>
                                    <BooleanCell value={loc.openPlay} />
                                    <BooleanCell value={loc.reservations} />
                                    <BooleanCell value={loc.lessons} />
                                    <td className="*:inline *:size-6">
                                        <BiEdit onClick={() => generalOperation(loc)} />
                                        <BiTrash onClick={() => deleteOperation(loc)} />
                                        <BiTime onClick={() => scheduleOperation(loc)} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ApprovalTable refreshLocations={fetchLocations} stagedLocations={stagedLocations!} />

                <div className="gap-12 bg-slate-600 p-4 flex">
                    <div>
                        <h3>Spreadsheet File Upload</h3>
                        <input className="file:rounded-md file:border-0 file:bg-fuchsia-800 file:px-2 file:py-1" type="file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />

                        <div>
                            <h3>Download Blank Sheet</h3>
                            <a></a>
                        </div>
                    </div>
                    <table className="border-spacing-1 border-separate">
                        <caption>Accepted Fields and Inputs</caption>
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Column Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Location Name</td>
                                <td>name</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>address</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>phoneNumber</td>
                            </tr>
                            <tr>
                                <td>Site</td>
                                <td>url</td>
                            </tr>
                            <tr>
                                <td>Zipcode</td>
                                <td>zipcode</td>
                            </tr>
                            <tr>
                                <td>Open Play (true/false)</td>
                                <td>openPlay</td>
                            </tr>
                            <tr>
                                <td>Reservations (true/false)</td>
                                <td>reservations</td>
                            </tr>
                            <tr>
                                <td>Lessons (true/false)</td>
                                <td>lessons</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {editType == 'general' && <GeneralModal editingLocation={editingLocation} clearSelection={clearSelection} fetchLocations={fetchLocations}/>}
            {editType == 'description' && <DescriptionModal editingLocation={editingLocation} clearSelection={clearSelection} fetchLocations={fetchLocations}/>}
            {editType == 'delete' && <DeleteModal editingLocation={editingLocation} clearSelection={clearSelection} fetchLocations={fetchLocations}/>}
            {editType == 'schedule' && <ScheduleModal editingLocation={editingLocation} clearSelection={clearSelection} fetchLocations={fetchLocations}/>}
        </DetailPageLayout>
    )
}
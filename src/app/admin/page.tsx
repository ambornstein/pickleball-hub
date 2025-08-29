'use client'

import ApprovalTable from "@/components/admin/ApprovalTable";
import { BooleanCell } from "@/components/admin/BooleanCell";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { useEffect, useState } from "react";
import { BiEdit, BiFile, BiTime, BiTrash, } from "react-icons/bi";
import ScheduleModal from "@/components/admin/modal/ScheduleModal";
import DeleteModal from "@/components/admin/modal/DeleteModal";
import GeneralModal from "@/components/admin/modal/GeneralModal";
import DescriptionModal from "@/components/admin/modal/DescriptionModal";
import ColumnNameTable from "@/components/admin/ColumnNameTable";
import AdminPermissionTable from "@/components/admin/AdminPermissionTable";
import Papa from 'papaparse';


export interface AdminEditModalProps {
    editingLocation?: Venue
    clearSelection: () => void
    fetchLocations: () => void
}

export default function AdminPage() {
    const [locations, setLocations] = useState<Venue[]>()
    const [stagedLocations, setStagedLocations] = useState<Venue[]>()

    const [editingLocation, setEditingLocation] = useState<Venue | undefined>(undefined)
    const [editType, setEditType] = useState<'general' | 'description' | 'schedule' | 'delete' | undefined>(undefined)
    const [file, setFile] = useState<File | undefined>()

    const fetchLocations = () => fetch('api/location').then(res => res.json()).then(data => setLocations(data))
    const fetchPendingLocations = () => fetch('api/pending-location').then(res => res.json()).then(data => setStagedLocations(data))

    const refreshLocations = () => {
        fetchLocations()
        fetchPendingLocations()
    }

    useEffect(() => { refreshLocations() }, [])

    const clearSelection = () => {
        setEditingLocation(undefined)
        setEditType(undefined)
    }

    const editWithOperation = (loc: Venue, mode: 'general' | 'description' | 'schedule' | 'delete') => {
        setEditingLocation(loc)
        setEditType(mode)
    }

    const submitBatch = async () => {
        const text = await file!.text()
        const data = Papa.parse(text, {
            header: true,
        });

        Promise.all(data.data.map((row: any) => {
            if (!row.name || locations?.find(v => v.name == row.name))
                return

            return fetch('api/location', {
                method: 'POST',
                body: JSON.stringify(row)
            })
        })).then(fetchLocations)
    }

    return (
        <DetailPageLayout>
            <div className="flex flex-col gap-4 items-center">
                <div className="w-fit bg-slate-800">
                    <table className="border-spacing-y-2 border-separate w-4xl
                [&_td]:border-y [&_td]:border-slate-500  [&_td]:text-nowrap [&_th]:text-nowrap [&_td]:max-w-[200px] [&_td]:p-1 [&_td]:truncate">
                        <caption className="text-xl mb-4">Existing Locations</caption>
                        <thead>
                            <tr>
                                <th>Location Name</th>
                                <th>Address</th>
                                <th>Site</th>
                                <th>Zipcode</th>
                                <th>Open Play</th>
                                <th>Reservations</th>
                                <th>Lessons</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations?.map((loc) =>
                                <tr key={loc._id} className={`${loc == editingLocation ? 'bg-blue-800' : ''} hover:cursor-pointer`} onClick={() => setEditingLocation(loc)}>
                                    <td>{loc.name}</td>
                                    <td>{loc.address}</td>
                                    <td className="link"><a href={loc.url}>{loc.url}</a></td>
                                    <td>{loc.zipcode}</td>
                                    <BooleanCell value={loc.openPlay} />
                                    <BooleanCell value={loc.reservations} />
                                    <BooleanCell value={loc.lessons} />
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="h-12 flex m-2 p-1 items-center gap-2 bg-slate-700">
                        <span className="inline text-lg">Click to select location record</span>
                        {editingLocation && <div className="inline-flex *:size-8 *:hover:cursor-pointer">
                            <BiFile onClick={() => editWithOperation(editingLocation, 'description')} />
                            <BiEdit onClick={() => editWithOperation(editingLocation, 'general')} />
                            <BiTrash onClick={() => editWithOperation(editingLocation, 'delete')} />
                            <BiTime onClick={() => editWithOperation(editingLocation, 'schedule')} />
                        </div>}
                    </div>
                </div>
                <ApprovalTable refreshLocations={refreshLocations} stagedLocations={stagedLocations!} />

                <div className="w-4xl gap-12 bg-slate-800 p-4">
                    <div className="m-auto">
                        <h3>Spreadsheet File Upload</h3>
                        <input onChange={(e) => setFile(e.target.files![0])} className="block file:rounded-md file:border-0 file:bg-fuchsia-800 file:px-2 file:py-1" type="file"
                            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                        <button className="block" onClick={() => submitBatch()}>Submit</button>
                        <a href="location-sheet.csv" download={true} className="link">Download Blank Sheet</a>
                    </div>
                    <ColumnNameTable />
                </div>

                <AdminPermissionTable locations={locations} />
            </div>

            {editType == 'general' && <GeneralModal editingLocation={editingLocation} clearSelection={clearSelection} fetchLocations={fetchLocations} />}
            {editType == 'description' && <DescriptionModal editingLocation={editingLocation} clearSelection={clearSelection} fetchLocations={fetchLocations} />}
            {editType == 'delete' && <DeleteModal editingLocation={editingLocation} clearSelection={clearSelection} fetchLocations={fetchLocations} />}
            {editType == 'schedule' && <ScheduleModal editingLocation={editingLocation} clearSelection={clearSelection} fetchLocations={fetchLocations} />}
        </DetailPageLayout>
    )
}
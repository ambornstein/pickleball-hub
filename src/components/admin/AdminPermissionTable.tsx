'use client'

import { useEffect, useState } from "react"
import GrantFormModal from "./modal/GrantFromModal"
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi"

interface PermissionTableProps {
    locations?: Venue[]
}

export default function AdminPermissionTable(props: PermissionTableProps) {
    const [permissionEntries, setPermissionEntries] = useState<PermissionGrant[]>()
    const [modalOpen, setModalOpen] = useState(false)

    const [selectedGrant, setSelectedGrant] = useState<PermissionGrant | undefined>(undefined)

    const fetchPermissions = () =>
        fetch('api/permissions').then(res => res.json()).then(data => setPermissionEntries(data))

    useEffect(() => {
        fetchPermissions();
    }, [])

    const deletePermissionGrant = async (email: string) =>
        fetch(`api/permissions/${email}`, { method: 'DELETE' })

    return (
        <div className="bg-slate-800">
            <table className="w-4xl border-spacing-1 border-separate [&_td]:border [&_td]:border-slate-500 [&_td]:px-0.5">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Managed Venues</th>
                    </tr>
                </thead>
                <tbody>
                    {permissionEntries?.map((perm) =>
                        <tr className={`cursor-pointer ${perm == selectedGrant ? 'bg-blue-800' : ''}`} key={perm._id} onClick={() => setSelectedGrant(perm)}>
                            <td>{perm.email}</td>
                            <td>{perm.role}</td>
                            <td>{perm.managedLocations.map((loc: any) => loc.name).join(', ')}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="max-w-full h-12 m-2 p-1 flex items-center gap-2 bg-slate-700 ">
                {selectedGrant && <>
                    <button className="button" onClick={() => setSelectedGrant(undefined)}>Unselect</button>
                    <BiEdit className="icon" onClick={() => setModalOpen(true)} />
                    <BiTrash className="icon" onClick={() => deletePermissionGrant(selectedGrant.email).then(() => {
                        fetchPermissions()
                        setSelectedGrant(undefined)
                    })} />
                </>}
                <BiPlus className="ml-auto icon" onClick={() => {
                    setSelectedGrant(undefined)
                    setModalOpen(true)
                }} />
            </div>
            <GrantFormModal modalOpen={modalOpen} setModalOpen={setModalOpen} locations={props.locations} editGrant={selectedGrant} fetchPermissions={fetchPermissions} />
        </div>
    )
}
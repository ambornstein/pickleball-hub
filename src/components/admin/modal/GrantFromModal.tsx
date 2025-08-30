import Modal from "@/components/Modal"
import { FormEvent } from "react"

interface GrantFormProps {
    locations?: Venue[]
    modalOpen: boolean
    setModalOpen: (bool: boolean) => void
    editGrant?: PermissionGrant
    fetchPermissions: () => void
}

export default function GrantFormModal(props: GrantFormProps) {

    const submitForm = async (e: FormEvent)  => {
        e.preventDefault()

        await fetch(`api/permissions/${props.editGrant?.email ?? ''}`, {
            method: !!props.editGrant ? 'PATCH' :'POST',
            body: new FormData(e.target as HTMLFormElement)
        })

        props.setModalOpen(false)
        props.fetchPermissions()
    }

    return (
        <Modal isOpen={props.modalOpen} setIsOpen={props.setModalOpen}>
            <form className="space-x-0" onSubmit={submitForm}>
                <input className="text-input" type="email" name="email" defaultValue={props.editGrant?.email} readOnly={!!props.editGrant?.email} />
                <select name="role" defaultValue={props.editGrant?.role}>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                </select>
                <select multiple name="managedLocations" className="h-16 overflow-y-scroll w-full text-input">
                    {props.locations?.map((venue) =>
                        <option key={venue._id} value={venue._id}>{venue.name}</option>)}
                </select>
                <input className="button" type="submit" />
            </form>
        </Modal>
    )
}
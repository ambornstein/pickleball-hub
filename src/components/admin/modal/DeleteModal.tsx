import { AdminEditModalProps } from "@/app/admin/page";
import Modal from "@/components/Modal";

export default function DeleteModal(props: AdminEditModalProps) {
    const deleteLocation = async () => {
        if (!props.editingLocation) return
        await fetch(`api/location/${props.editingLocation._id}`, { method: "DELETE" })

        props.fetchLocations()
        props.clearSelection()
    }

    return (
        <Modal isOpen={!!props.editingLocation} setIsOpen={props.clearSelection} >
            <p>Are you sure you want to delete {props.editingLocation?.name}?</p>
            <div className="flex w-full justify-between mt-12">
                <button className="button bg-red-800 border-fuchsia-950" onClick={deleteLocation}>Confirm</button>
                <button className="button bg-neutral-800" onClick={props.clearSelection}>Cancel</button>
            </div>
        </Modal>)
}
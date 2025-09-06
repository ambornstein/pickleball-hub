import { AdminEditModalProps } from "@/app/admin/page";
import { useStatus } from "@/components/context/StatusContext";
import Modal from "@/components/Modal";
import { extractFormJSON } from "@/lib/utils";
import { FormEvent } from "react";

export default function DescriptionModal(props: AdminEditModalProps) {
    const {startLoading, endLoading } = useStatus();

    const updateDescription = async (e: FormEvent) => {
        e.preventDefault();
        if (!props.editingLocation) return

        const formData = extractFormJSON(e)

        const data = {
            ...formData,
            openPlay: props.editingLocation.openPlay,
            reservations: props.editingLocation.reservations,
            lessons: props.editingLocation.lessons
        }

        startLoading()
        await fetch(`api/location/${props.editingLocation._id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
        endLoading()

        props.clearSelection()
        props.fetchLocations()
    }

    return (
        <Modal isOpen={!!props.editingLocation} setIsOpen={props.clearSelection}>
            <h2>Description</h2>
            <form className="block" onSubmit={updateDescription}>
                <textarea className="w-full my-4 h-48 text-input " name="description" defaultValue={props.editingLocation?.description} />
                <input className="button w-full" type="submit" />
            </form>
        </Modal>)
}
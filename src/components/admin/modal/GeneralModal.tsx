import { FormEvent } from "react";
import { extractFormJSON } from "@/lib/utils";
import LocationForm from "@/components/input/LocationForm";
import Modal from "@/components/Modal";
import { AdminEditModalProps } from "@/app/admin/page";

export default function GeneralModal(props: AdminEditModalProps) {

    const updateLocation = async (e: FormEvent) => {
        e.preventDefault();
        if (!props.editingLocation) return

        const formData = extractFormJSON(e)
        delete formData.zipcode

        await fetch(`api/location/${props.editingLocation._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        props.clearSelection()
        props.fetchLocations()
    }

    return (
        <Modal isOpen={!!props.editingLocation} setIsOpen={props.clearSelection}>
            <LocationForm submitAction={updateLocation} location={props.editingLocation} />
        </Modal>)
}
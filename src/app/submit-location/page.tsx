'use client'

import { useSnackbar } from "@/components/context/SnackbarContext";
import { FormPageLayout } from "@/components/layout/FormPageLayout";
import LocationForm from "@/components/input/LocationForm";
import { extractFormJSON } from "@/lib/utils";
import { FormEvent } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
    const { pending } = useFormStatus();
    return (<input type="submit" className="button w-full disabled:bg-teal-100" disabled={pending} />)
}

export default function NewLocationPage() {
    const { pingNotification } = useSnackbar();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formJson = extractFormJSON(e)
        const form = new FormData(e.target as HTMLFormElement)

        await fetch('api/pending-location', {
            method: 'POST',
            body: form
        })
        
        pingNotification(`${formJson.locationName} has been submitted for review!`)
    }

    return (
        <FormPageLayout>
            <LocationForm submitAction={handleSubmit}/>
        </FormPageLayout>
    )
}
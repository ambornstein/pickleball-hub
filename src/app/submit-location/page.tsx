'use client'

import { useStatus } from "@/components/context/StatusContext";
import { FormPageLayout } from "@/components/layout/FormPageLayout";
import LocationForm from "@/components/input/LocationForm";
import { extractFormJSON } from "@/lib/utils";
import { FormEvent } from "react";

export default function NewLocationPage() {
    const { pingNotification, startLoading, endLoading } = useStatus();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formJson = extractFormJSON(e)
        const form = new FormData(e.target as HTMLFormElement)

        startLoading()
        await fetch('api/pending-location', {
            method: 'POST',
            body: form
        })
        endLoading()
        
        pingNotification(`${formJson.locationName} has been submitted for review!`)
    }

    return (
        <FormPageLayout>
            <LocationForm submitAction={handleSubmit}/>
        </FormPageLayout>
    )
}
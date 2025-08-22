import { FormEvent } from "react"

export function handleServerError(error: any) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 })
    }
    else {
        return new Response("Something went wrong", { status: 500 })
    }
}

export function extractFormJSON(e: FormEvent) {
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries())
    
    return formJson;
}
'use client'

import InputField from "@/components/InputField";
import { FormPageLayout } from "@/components/layout/FormPageLayout";
import { emailRegex, passwordRegex } from "@/lib/config"
import Link from "next/link";
import { SubmitButton } from "../submit-location/page";
import { FormEvent } from "react";
import { useSnackbar } from "@/components/context/SnackbarContext";

export default function RegisterPage() {
    const { pingWarning } = useSnackbar();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries())

        if (formJson.password != formJson.confirmedPassword) {
            pingWarning("The passwords must match")
            return
        }

        fetch('api/auth/register', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formJson)
        })
    }

    return (
        <FormPageLayout>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                <InputField label="Display Name" valueName="name" />
                <InputField label="Email" valueName="email" type="email"
                    validationRegex={emailRegex}
                    enforceMessage="Please enter a valid email." />
                <InputField label="Password" valueName="password" type="password"
                    validationRegex={passwordRegex}
                    enforceMessage="Please enter a password with at least 8 characters." />
                <InputField label="Confirm Password" valueName="confirmedPassword" type="password" />
                <hr />
                <SubmitButton />
            </form>
            <p className="font-sm mt-8">Already have an account? <Link className="link" href="/login">Log in</Link></p>
        </FormPageLayout>
    )
}
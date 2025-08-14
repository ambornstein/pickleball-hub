'use client'

import InputField from "@/components/InputField"
import Link from "next/link"
import { emailRegex, passwordRegex } from "@/lib/config"
import { FormEvent } from "react"
import { FormPageLayout } from "@/components/layout/FormPageLayout"
import { SubmitButton } from "../submit-location/page"
import { useAuth } from "@/components/context/AuthContext"
import { useSnackbar } from "@/components/context/SnackbarContext"
import { extractFormJSON } from "@/lib/utils"

export default function LoginPage() {
    const { login } = useAuth();
    const { pingWarning } = useSnackbar();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formJson = extractFormJSON(e)

        if (!(formJson.email && formJson.password))
            return

        try {
            const hold = await login(formJson.email.toString(), formJson.password.toString())
        }
        catch (error) {
            pingWarning(error)
        }
    }

    return (
        <FormPageLayout>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                <InputField label="Email" type="email" valueName="email"
                    validationRegex={emailRegex}
                    enforceMessage="Please enter a valid email." />
                <InputField label="Password" valueName="password" type="password"
                    validationRegex={passwordRegex}
                    enforceMessage="Please enter a password with at least 8 characters." />
                <hr />
                <SubmitButton />
            </form>
            <p className="font-sm mt-8">Don't have an account? <Link className="link" href="/register">Sign up</Link></p>
        </FormPageLayout>
    )
}
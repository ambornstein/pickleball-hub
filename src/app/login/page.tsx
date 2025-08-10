'use client'

import InputField from "@/components/InputField"
import Link from "next/link"
import { emailRegex, passwordRegex } from "@/lib/config"
import { FormEvent, useState } from "react"
import { FormPageLayout } from "@/components/layout/FormPageLayout"

export default function LoginPage() {
    const [checkEmail, setCheckEmail] = useState(false)
    const [checkPassword, setCheckPassword] = useState(false)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);

        const formJson = Object.fromEntries(formData.entries())

        console.log(formData);
    }

    return (
        <FormPageLayout>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                <InputField label="Email" type="email" valueName="email"
                    validationRegex={emailRegex}
                    enforceMessage="Please enter a valid email." />
                <InputField label="Password" valueName="password"
                    validationRegex={passwordRegex}
                    enforceMessage="Please enter a password with at least 8 characters." />
                <hr />
                <button className="button w-full" type="submit">SUBMIT</button>
            </form>
            <p className="font-sm mt-8">Don't have an account? <Link className="link" href="/register">Sign up</Link></p>
        </FormPageLayout>
    )
}
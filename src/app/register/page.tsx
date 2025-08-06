'use client'

import InputField from "@/components/InputField";
import { emailRegex, passwordRegex } from "@/lib/config"
import Link from "next/link";

export default function RegisterPage() {
    return (<div className="center min-h-screen font-standard">
        <div className="panel">
            <h2>Register</h2>
            <form className="flex flex-col gap-4 mt-8">
                <InputField label="Display Name" valueName="name" />
                <InputField label="Email" valueName="email"
                    validationRegex={emailRegex}
                    enforceMessage="Please enter a valid email." />
                <InputField label="Password" valueName="password"
                    validationRegex={passwordRegex}
                    enforceMessage="Please enter a password with at least 8 characters." />
                <InputField label="Confirm Password" valueName="confirmedPassword" />
                <hr />
                <button className="button w-full" type="submit">SUBMIT</button>
            </form>
            <p className="font-sm mt-8">Already have an account? <Link className="link" href="/login">Log in</Link></p>
        </div>
    </div>)
}
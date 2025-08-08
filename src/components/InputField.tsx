'use client'

import { useState } from "react"

interface InputProps {
    label: string,
    valueName: string,
    className?: string,
    validationRegex?: RegExp,
    enforceMessage?: string,
    autoComplete?: string}

export default function InputField({label, valueName, className, validationRegex, enforceMessage, autoComplete }: InputProps) {
    const [value, setValue] = useState("")
    const [check, setCheck] = useState(false)

    return (
        <div className={`${className} relative`} >
            <input onBlur={() => setCheck(true)} onFocus={() => setCheck(false)} onChange={e => setValue(e.target.value)} name={valueName} type="text" placeholder="" autoComplete={autoComplete}
                className="peer text-input"></input>
            <label className="text-input-label transform transition-all origin-left
            peer-focus:-top-2.5 peer-focus:left-2.5 peer-focus:text-sm
            peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2.5 peer-[:not(:placeholder-shown)]:text-sm">{label}</label>
            {check && validationRegex && !validationRegex.test(value) &&
                <p className="mt-4 text-red-700">{enforceMessage}</p>}
        </div>
    ) 
}
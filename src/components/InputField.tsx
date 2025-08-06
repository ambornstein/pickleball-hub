'use client'

import { Ref, useImperativeHandle, useState } from "react"

interface InputProps {
    label: string,
    valueName: string,
    className?: string,
    validationRegex?: RegExp,
    enforceMessage?: string,
}

export default function InputField({label, valueName, className, validationRegex, enforceMessage }: InputProps) {
    const [value, setValue] = useState("")
    const [check, setCheck] = useState(false)

    return (
        <div className={`${className} relative`} >
            <input onBlur={() => setCheck(true)} onFocus={() => setCheck(false)} onChange={e => setValue(e.target.value)} name={valueName} type="text" placeholder=""
                className="peer w-full px-3 py-2 outline-1 border border-zinc-300 p-2 rounded-md transition duration-300 ease shadow-sm
                     focus:outline-none focus:border-fuchsia-600  focus:shadow"></input>
            <label className="absolute pointer-events-none cursor-text bg-background px-1 left-2.5 top-2 transform transition-all origin-left
            peer-focus:-top-2.5 peer-focus:left-2.5 peer-focus:text-sm
            peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2.5 peer-[:not(:placeholder-shown)]:text-sm">{label}</label>
            {check && validationRegex && !validationRegex.test(value) &&
                <p className="mt-4 text-red-700">{enforceMessage}</p>}
        </div>
    ) 
}
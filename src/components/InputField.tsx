'use client'

import { useEffect, useState } from "react"

interface InputProps {
    label: string,
    valueName: string,
    updateObserver?: (v: string) => void,
    type?: string,
    className?: string,
    validationRegex?: RegExp,
    enforceMessage?: string,
    autoComplete?: string
}

export default function InputField(props: InputProps) {
    const [value, setValue] = useState('')
    const [check, setCheck] = useState(false)

    useEffect(() => {
        if (props.updateObserver) props.updateObserver(value)
    }, [value])

    return (
        <div className={`${props.className} relative`} >
            <input onBlur={() => setCheck(true)}
                onFocus={() => setCheck(false)}
                onChange={e => setValue(e.target.value)}
                name={props.valueName}
                type={props.type ?? "text"} placeholder="" autoComplete={props.autoComplete}
                className="peer text-input"></input>
            <label className="text-input-label transform transition-all origin-left
            peer-focus:-top-2.5 peer-focus:left-2.5 peer-focus:text-sm
            peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2.5 peer-[:not(:placeholder-shown)]:text-sm">
                {props.label}
            </label>
            {check && props.validationRegex && !props.validationRegex.test(value) &&
                <p className="mt-4 text-red-700">{props.enforceMessage}</p>}
        </div>
    )
}
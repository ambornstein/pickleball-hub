'use client'
import { createContext, useContext, useState } from "react"
import { CgClose } from "react-icons/cg";
import LoadingCover from "../LoadingCover";

const StatusContext = createContext({
    pingWarning: (content: any) => { },
    pingNotification: (content: any) => { },
    startLoading: () => { },
    endLoading: () => { }
})

export function StatusProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [message, setMessage] = useState('');
    const [urgent, setUrgent] = useState(false);
    const [loading, setLoading] = useState(false);

    function pingWarning(content: any) {
        activateMessage(content, true)
    }

    function pingNotification(content: any) {
        activateMessage(content)
    }

    const startLoading = () => setLoading(true)
    const endLoading = () => setLoading(false)

    function activateMessage(content: any, warn = false) {
        setUrgent(warn)

        if (content instanceof Error) {
            const errorContent = content.message
            setMessage(errorContent)
            return
        }

        setMessage(content as string)
    }

    return <StatusContext.Provider value={{ pingWarning, pingNotification, startLoading, endLoading }}>
        {loading &&
            <div className="absolute w-full h-full z-20">
                <LoadingCover />
            </div>}
        {children}
        {message && <div className={"fixed flex items-center bottom-10 left-[40%] bg-stone-700 w-[20%] font-standard p-2 text-lg rounded-md"}>
            <p className={urgent ? 'text-amber-300' : ''}>{message}</p>
            <CgClose className="ml-auto" onClick={() => setMessage('')} />
        </div>}
        
    </StatusContext.Provider>
}

export default StatusProvider;

export const useStatus = () => useContext(StatusContext)
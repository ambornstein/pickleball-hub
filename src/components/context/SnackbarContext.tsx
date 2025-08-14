'use client'
import { createContext, useContext, useState } from "react"
import { CgClose } from "react-icons/cg";

const SnackbarContext = createContext({
    pingWarning: (content: any) => {},
    pingNotification: (content: any) => {}
})

export function SnackbarProvider({ children }: Readonly<{ children: React.ReactNode }>)  {
    const [message, setMessage] = useState('');
    const [urgent, setUrgent] = useState(false);

    function pingWarning(content: any) {
        activateMessage(content, true)
    } 

    function pingNotification(content: any) {
        activateMessage(content)
    }

    function activateMessage(content: any, warn = false) {
        setUrgent(warn)

        if (content instanceof Error) {
            const errorContent = content.message
            setMessage(errorContent)
            return
        }
        
        setMessage(content as string)
    }

    return <SnackbarContext.Provider value={{pingWarning, pingNotification }}>
        {children}
        {message && <div className={"fixed flex items-center bottom-10 left-[40%] bg-stone-700 w-[20%] font-standard p-2 text-lg rounded-md"}>
            <p className={urgent ? 'text-amber-300' : ''}>{message}</p>
            <CgClose className="ml-auto" onClick={() => setMessage('')}/>
        </div>}
    </SnackbarContext.Provider>
}

export default SnackbarProvider;

export const useSnackbar = () => useContext(SnackbarContext)
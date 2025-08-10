"use client"
import { useAuth } from "./UserContext"

export default function HeaderBar() {
    const { user } = useAuth();

    return(<header className="sticky z-50 h-fit top-0 grid grid-cols-[10vw_auto_10vw] items-center mb-4 lg:px-12 pt-8 pb-2 border-b-2 bg-stone-700/70">
        <h1 className="col-start-2 text-center text-4xl">Houston Pickleball Hub</h1>
        <div className="lg:flex lg:flex-row flex-col space-x-2 justify-end hidden">
            <a href="/login" className="button float-end"><span className="w-fit">LOG IN</span></a>
            <a href="/register" className="button float-end text-fuchsia-400"><span className="w-fit">SIGN UP</span></a>
        </div>
    </header>)
}
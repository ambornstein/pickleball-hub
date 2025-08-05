"use client"
import { useAuth } from "./UserContext"

export default function HeaderBar() {
    const { user } = useAuth();

    return(<header className="sticky top-0 grid grid-cols-[20%_auto_20%] mb-4 px-[10%] pt-8 pb-2 border-b-2 bg-zinc-600/45 ">
        <h1 className="col-start-2 text-center text-4xl">Houston Pickleball Hub</h1>
        <div className="flex space-x-2 justify-end">
            <a href="/login" className="button">LOG IN</a>
            <a href="/register" className="button text-fuchsia-600">SIGN UP</a>
        </div>
    </header>)
}
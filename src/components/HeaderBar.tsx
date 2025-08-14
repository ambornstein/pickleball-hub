"use client"
import { BiUser } from "react-icons/bi";
import { useAuth } from "./context/AuthContext"

export default function HeaderBar() {
    const { user, logout } = useAuth();

    return (<header className="sticky z-50 h-fit top-0 grid grid-cols-[400px_auto_400px] items-center mb-4 lg:px-12 pt-8 pb-2 border-b-2 bg-stone-700/70">
        <h1 className="col-start-2 text-center text-4xl">Houston Pickleball Hub</h1>
        <div className="lg:flex flex-row gap-4 justify-end items-center hidden">
            {user ? <>
                <BiUser/>
                <span>{user.username}</span> 
                <span onClick={logout} className="button w-fit">Log Out</span>
            </> : <>
                <a href="/login" className="button float-end"><span className="w-fit">Log In</span></a>
                <a href="/register" className="button float-end text-fuchsia-400"><span className="w-fit">Sign Up</span></a>
            </>}
        </div>
    </header>)
}
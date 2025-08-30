"use client"
import { BiUser } from "react-icons/bi";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function HeaderBar() {
    const [expanded, setExpanded] = useState(false)
    const { data: session, status, update } = useSession();

    useEffect(() => {
        if (status === 'loading' || !session) {
            update();
        }
        console.log(session)
    }, [session, status, update]);

    return (<header className="sticky z-50 h-fit top-0 grid grid-cols-[400px_auto_400px] items-center mb-4 lg:px-12 pt-8 pb-2 border-b-2 bg-stone-700/70">
        <h1 className="col-start-2 text-center text-4xl">Houston Pickleball Hub</h1>
        <div className="lg:flex gap-4 justify-end items-center hidden">
            {session ? <>
                <div className="flex gap-4 bg-neutral-700 items-center p-2 rounded-md cursor-pointer" onClick={() => setExpanded(!expanded)}>
                    <BiUser />
                    <span>{session.user?.name}</span>
                </div>
                {expanded &&
                    <div className="absolute top-20 bg-zinc-700 rounded-lg w-48 p-2">
                        {session.user.role == 'Admin' && <a className="block" href="/admin">Admin Dashboard</a>}
                        <a className="block" href="/account">My Profile</a>
                        <button className="block" onClick={() => signOut()} >Log Out</button>
                    </div>}
            </> : <>
                <button onClick={() => signIn()} className="button float-end">Log In</button>
                <a href="/register" className="button float-end text-fuchsia-400">Sign Up</a>
            </>}
        </div>
    </header>)
}
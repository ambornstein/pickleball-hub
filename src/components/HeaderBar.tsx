"use client"
import { BiUser } from "react-icons/bi";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeaderBar() {
    const [expanded, setExpanded] = useState(false)
    const { data: session, status, update } = useSession();

    useEffect(() => {
        if (status === 'loading' || !session) {
            update();
        }
    }, [session, status, update]);

    return (<header className="sticky z-50 h-fit top-0 flex items-center p-4 gap-4 lg:pr-20 lg:gap-0 ">
        <a href='/' className="text-lg lg:text-2xl bg-zinc-700/50 p-2 rounded-sm lg:p-4">Houston Pickleball Hub</a>
        <div className="ml-auto flex gap-2">
            {status == 'loading' ? <Image width={75} height={75} alt="loading" className="invert rounded-2xl" src="/padel.gif"/> :
                session ? <>
                    < div className="flex gap-4 bg-neutral-700 items-center p-2 rounded-md cursor-pointer" onClick={() => setExpanded(!expanded)}>
                        <BiUser className="size-8" />
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
        </div >
    </header >)
}
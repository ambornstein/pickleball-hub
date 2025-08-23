"use client"
import { BiUser } from "react-icons/bi";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function HeaderBar() {
    const { data: session, status, update } = useSession();

    useEffect(() => {
        console.log(status)
        if (status === 'loading' || !session) {
            update();
        }
    }, [session, status, update]);

    return (<header className="sticky z-50 h-fit top-0 grid grid-cols-[400px_auto_400px] items-center mb-4 lg:px-12 pt-8 pb-2 border-b-2 bg-stone-700/70">
        <h1 className="col-start-2 text-center text-4xl">Houston Pickleball Hub</h1>
        <div className="lg:flex flex-row gap-4 justify-end items-center hidden">
            {session ? <>
                <BiUser />
                <span>{session.user?.name}</span>
                <button onClick={() => signOut()} className="button w-fit">Log Out</button>
            </> : <>
                <button onClick={() => signIn()} className="button float-end">Log In</button>
                <a href="/register" className="button float-end text-fuchsia-400">Sign Up</a>
            </>}
        </div>
    </header>)
}
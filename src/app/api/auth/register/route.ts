import dbConnect from "@/lib/db"
import User from '@/lib/models/user'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const formData = await request.formData()

    await dbConnect();
    console.log(formData.get("email"))

    const user = new User({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    })

    await user.save()

    return NextResponse.redirect(new URL('/login', request.url))
}
import dbConnect from "@/lib/db"
import User from '@/lib/models/user'
import { hash } from '@/lib/security'
import { handleServerError } from "@/lib/utils";
import { Document } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData()

        await dbConnect();

        if (!(formData.get("password") && formData.get("email") && formData.get("name"))) {
            return new NextResponse("Credentials not fully formed for creation of new account", { status: 400 })
        }

        const password = await hash(formData.get("password")!.toString());

        console.log(password)
        const user: Document = new User({
            name: formData.get("name"),
            email: formData.get("email"),
            password: password
        })

        await user.save()

        return NextResponse.redirect(new URL('/login', request.url))
    }

    catch (error) {
        handleServerError(error)
    }
}
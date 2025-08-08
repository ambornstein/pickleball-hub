import dbConnect from "@/lib/db"
import User from '@/lib/models/user'
import { Document } from "mongoose";
import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

export async function POST(request: Request) {
    try {
        const formData = await request.formData()

        await dbConnect();

        const password = formData.get("password")!.toString();

        const user: Document = new User({
            name: formData.get("name"),
            email: formData.get("email"),
            password: createHash(password)
        })

        await user.save()

        return NextResponse.redirect(new URL('/login', request.url))
    }

    catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 })
        }
        else {
            return new Response("Something went wrong", { status: 500 })
        }

    }
}
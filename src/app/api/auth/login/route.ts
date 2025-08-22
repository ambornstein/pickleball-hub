import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/user";
import jwt from "jsonwebtoken"
import { handleServerError } from "@/lib/utils";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const creds = await request.json();

        const user = await User.findOne({ email: creds.email }).exec();

        if (!user)
            return new NextResponse("No user found with email", { status: 401 })

        if (creds.hashedPassword != user.password)
            return new NextResponse("Invalid password", { status: 401 })

        return NextResponse.json({
            email: user.email,
            name: user.name,
            token: jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET!
            )
        })
    }
    catch(error) {
        handleServerError(error);
    }
}

import dbConnect from "@/lib/db";
import Permission from "@/lib/models/permission"
import { handleServerError } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    const { email } = await params
    try {
        await dbConnect();

        const roleEntries = await Permission.findOne({ email: email }).populate('managedLocations', 'name')

        return NextResponse.json(roleEntries)
    } catch (error) {
        console.log(error)
        handleServerError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    const { email } = await params
    try {
        await dbConnect();

        let data
        if (request.headers.get('Content-Type')?.match('multipart/form-data')) {
            const formData = await request.formData()

            data = {
                email: formData.get("email"),
                role: formData.get("role")!.toString(),
                managedLocations: formData.getAll("managedLocations")
            }
        }
        else {
            data = await request.json()
        }

        await Permission.findOneAndUpdate({email: email}, { $set: data }).exec()

        return new NextResponse("Updated permissions of" + email, { status: 200 })
    } catch (error) {
        handleServerError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    const { email } = await params;
    try {
        await dbConnect();

        await Permission.findOneAndDelete({email: email}).exec()

        return new NextResponse("Deleted permission " + email, { status: 200 })
    }
    catch (error) {
        console.log(error)
        handleServerError(error);
    }
}
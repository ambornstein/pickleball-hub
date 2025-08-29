import dbConnect from "@/lib/db";
import Permission from "@/lib/models/permission"
import { handleServerError } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        await dbConnect();

        const roleEntries = await Permission.find({ _id: id }).populate('managedLocations', 'name')
        console.log(roleEntries)

        return NextResponse.json(roleEntries)
    } catch (error) {
        handleServerError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
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

        await Permission.findByIdAndUpdate(id, { $set: data }).exec()

        return new NextResponse("Updated " + id, { status: 200 })
    } catch (error) {
        handleServerError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        await dbConnect();

        await Permission.findByIdAndDelete(id).exec()

        return new NextResponse("Deleted permission " + id, { status: 200 })
    }
    catch (error) {
        console.log(error)
        handleServerError(error);
    }
}
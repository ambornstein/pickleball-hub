import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Permission from "@/lib/models/permission"
import { handleServerError } from "@/lib/utils";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const roleEntries = await Permission.find({}).populate('managedLocations', 'name')
        return NextResponse.json(roleEntries)
    } catch (error) {
        handleServerError(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const formData = await request.formData()

        const data = {
            email: formData.get("email"),
            role: formData.get("role")!.toString(),
            managedLocations: formData.getAll("managedLocations")
        }

        const grant = new Permission(data)
        grant.save()

        return new NextResponse("Created permission for " + grant.email, { status: 200 })
    }
    catch (error) {
        handleServerError(error);
    }
}
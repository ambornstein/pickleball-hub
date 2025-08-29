import dbConnect from "@/lib/db";
import { PendingLocation, Location } from "@/lib/models/location";
import { handleServerError } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        await dbConnect();

        const locations = await PendingLocation.findById(id);

        return Response.json(locations)
    } catch (error) {
        handleServerError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        await dbConnect();
        const location = await PendingLocation.findById(id)

        const movedLocation = new Location(location?.toJSON())
        movedLocation.save()

        await PendingLocation.findByIdAndDelete(id)

        return new NextResponse("Transferred location to approved", { status: 200 })
    }
    catch (error) {
        handleServerError(error)
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        await dbConnect();
        
        await PendingLocation.findByIdAndDelete(id)
        return new NextResponse("Deleted " + id, { status: 200 })
    }
    catch (error) {
        handleServerError(error)
    }
}
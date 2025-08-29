import { NextRequest, NextResponse } from "next/server";
import { Document } from "mongoose";
import { Location } from "@/lib/models/location"
import dbConnect from "@/lib/db";
import { handleServerError } from "@/lib/utils";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        await dbConnect();

        const locations = await Location.findById(id).exec();

        return Response.json(locations)
    } catch (error) {
        handleServerError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        await dbConnect();

        let data: any
        if (request.headers.get('Content-Type')?.match('multipart/form-data')) {
            const formData = await request.formData()
            data = Object.fromEntries(formData);
        }
        else {
            data = await request.json()
        }

        if (data.locationName)
            data = { ...data, name: data.locationName }

        data = {
            ...data,
            openPlay: Boolean(data.openPlay),
            reservations: Boolean(data.reservations),
            lessons: Boolean(data.lessons)
        }

        await Location.findByIdAndUpdate(id, { $set: data }).exec()

        return new NextResponse("Updated " + id, { status: 200 })
    }
    catch (error) {
        handleServerError(error)
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        await dbConnect();

        await Location.findByIdAndDelete(id)
        
        return new NextResponse("Deleted " + id, { status: 200 })
    }
    catch (error) {
        handleServerError(error)
    }
}
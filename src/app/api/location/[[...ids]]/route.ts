import { NextRequest, NextResponse } from "next/server";
import { Document } from "mongoose";
import { Location, PendingLocation , LocationSchema} from "@/lib/models/location"
import dbConnect from "@/lib/db";
import { handleServerError } from "@/lib/utils";

export async function GET(request: NextRequest, { params }: { params: Promise<{ ids: string[] }> }) {
    const { ids } = await params
    try {
        await dbConnect();

        if (ids) {
            const locations = await Location.findById(ids[0]).exec();

            return Response.json(locations)
        }
        else {
            const locations = await Location.find({});

            return Response.json(locations)
        }
    } catch (error) {
        handleServerError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ ids: string[] }> }) {
    const { ids } = await params
    try {
        await dbConnect();

        let data = await request.json()
        if (data.locationName)
            data = { ...data, name: data.locationName }

        if (ids) {
            const res = await Location.findByIdAndUpdate(ids[0], data, {upsert: true}).exec()

            return new NextResponse("Updated " + ids[0], { status: 200 })
        }
        return new NextResponse("Could not update, found no id", { status: 404 })
    }
    catch (error) {
        handleServerError(error)
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ ids: string[] }> }) {
    const { ids } = await params
    try {
        await dbConnect();
        if (ids) {
            await Location.findByIdAndDelete(ids[0])
            return new NextResponse("Deleted " + ids[0], { status: 200 })
        }
        return new NextResponse("Could not delete", { status: 404 })
    }
    catch (error) {
        handleServerError(error)
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const formData = await request.formData()
        const dataObject = Object.fromEntries(formData)

        const geocodingEndpoint = new URL("https://api.mapbox.com/search/geocode/v6/forward")

        geocodingEndpoint.searchParams.set("address_line1", dataObject.address.toString())
        geocodingEndpoint.searchParams.set("place", "Houston")
        geocodingEndpoint.searchParams.set("region", "TX")
        geocodingEndpoint.searchParams.set("access_token", 'pk.eyJ1IjoiYW1ib3Juc3RlaW4iLCJhIjoiY2x3ajhnYjBjMHk1cDJrbXdjZHdqaWZ3cyJ9._K7RJ6SvA6Tg2VtuZjfCig')

        const coordinates = await fetch(geocodingEndpoint);
        const coordJSON = await coordinates.json();

        const zip = dataObject.zipcode ? dataObject.zipcode.toString() : coordJSON.features[0].properties.context.postcode.name

        const location: Document = new Location({
            coordinates: coordJSON.features[0].geometry.coordinates,
            name: dataObject.locationName,
            address: dataObject.address,
            url: dataObject.url,
            phoneNumber: dataObject.phoneNumber,
            zipcode: zip,
            openPlay: Boolean(dataObject.openPlay),
            reservations: Boolean(dataObject.reservations),
            lessons: Boolean(dataObject.lessons)
        })

        await location.save()

        return new NextResponse("Created location " + location._id, { status: 200 })
    }
    catch (error) {
        handleServerError(error);
    }
}
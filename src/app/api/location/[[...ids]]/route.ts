import { NextRequest, NextResponse } from "next/server";
import { Document } from "mongoose";
import Location from "@/lib/models/location"
import dbConnect from "@/lib/db";
import { handleError } from "@/lib/utils";

export async function GET(request: NextRequest, { params }: { params: Promise<{ ids: string[] }> }) {
    const { ids } = await params
    try {
        await dbConnect();

        if (ids) {
            const locations = await Location.findById(ids[0]);

            return Response.json(locations)
        }
        else {
            const locations = await Location.find({});

            return Response.json(locations)
        }
    } catch (error) {
        handleError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ ids: string[] }> }) {
    const { ids } = await params
    try {
        await dbConnect();

        const data = await request.json()
        console.log(data)

        if (ids) {
            const res = await Location.findByIdAndUpdate(ids[0], data).exec()
            
            return new NextResponse("Updated " + ids[0], { status: 200 })
        }
        return new NextResponse("Could not update, found no id", { status: 404 })
    }
    catch (error) {
        handleError(error)
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
        handleError(error)
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const formData = await request.formData()
        const dataObject = Object.fromEntries(formData)

        const geocodingEndpoint = new URL("https://api.mapbox.com/search/geocode/v6/forward")

        geocodingEndpoint.searchParams.set("address_line1", formData.get("address")!.toString())
        geocodingEndpoint.searchParams.set("place", "Houston")
        geocodingEndpoint.searchParams.set("region", "TX")
        geocodingEndpoint.searchParams.set("access_token", 'pk.eyJ1IjoiYW1ib3Juc3RlaW4iLCJhIjoiY2x3ajhnYjBjMHk1cDJrbXdjZHdqaWZ3cyJ9._K7RJ6SvA6Tg2VtuZjfCig')

        const coordinates = await fetch(geocodingEndpoint);
        const coordJSON = await coordinates.json();

        const zip = dataObject.zipcode ? dataObject.zipcode.toString() : coordJSON.features[0].properties.context.postcode.name

        console.log(zip)
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

        return NextResponse.redirect(new URL('/search', request.url))
    }
    catch (error) {
        handleError(error);
    }
}
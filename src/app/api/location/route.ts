import { NextRequest, NextResponse } from "next/server";
import { Document } from "mongoose";
import { Location } from "@/lib/models/location"
import dbConnect from "@/lib/db";
import { handleServerError } from "@/lib/utils";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const locations = await Location.find({});

        return Response.json(locations)
    } catch (error) {
        handleServerError(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        let dataObject
        if (request.headers.get('Content-Type')?.match('multipart/form-data')) {
            const formData = await request.formData()
            dataObject = Object.fromEntries(formData)
        }
        else {
            dataObject = await request.json()
        }

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
            name: dataObject.locationName ?? dataObject.name,
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
        console.log(error)
        handleServerError(error);
    }
}
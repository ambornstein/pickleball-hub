import { NextRequest, NextResponse } from "next/server";
import { Document } from "mongoose";
import Location from "@/lib/models/location"
import dbConnect from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const formData = await request.formData()
        const dataObject = Object.fromEntries(formData)
        console.log(dataObject)

        const geocodingEndpoint = new URL("https://api.mapbox.com/search/geocode/v6/forward")

        geocodingEndpoint.searchParams.set("address_line1", formData.get("address")!.toString())
        geocodingEndpoint.searchParams.set("place", "Houston")
        geocodingEndpoint.searchParams.set("region", "TX")
        geocodingEndpoint.searchParams.set("access_token", 'pk.eyJ1IjoiYW1ib3Juc3RlaW4iLCJhIjoiY2x3ajhnYjBjMHk1cDJrbXdjZHdqaWZ3cyJ9._K7RJ6SvA6Tg2VtuZjfCig')

        const coordinates = await fetch(geocodingEndpoint);
        const coordJSON = await coordinates.json();

        console.log({
            coordinates: coordJSON.features[0].geometry.coordinates,
            name: dataObject.locationName,
            address: dataObject.address,
            url: dataObject.url,
            zipcode: dataObject.zipcode,
            openPlay: Boolean(dataObject.openPlay),
            reservations: Boolean(dataObject.reservations),
            lessons: Boolean(dataObject.lessons)
        })

        const location: Document = new Location({
            coordinates: coordJSON.features[0].geometry.coordinates,
            name: dataObject.locationName,
            address: dataObject.address,
            url: dataObject.url,
            zipcode: dataObject.zipcode,
            openPlay: Boolean(dataObject.openPlay),
            reservations: Boolean(dataObject.reservations),
            lessons: Boolean(dataObject.lessons)
        })

        await location.save()

        return new NextResponse("Success", { status: 200 })
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
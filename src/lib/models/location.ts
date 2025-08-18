import mongoose, { Schema, Document } from "mongoose"

export const LocationSchema = new mongoose.Schema({
    coordinates: {
        type: [Number],
        required: true
    },
    name: String,
    address: String,
    phoneNumber: String,
    url: String,
    zipcode: { type: Number, min: 77002, max: 77099, required: true },
    openPlay: Boolean,
    reservations: Boolean,
    lessons: Boolean
})

const Location = mongoose.models.Location || mongoose.model("Location", LocationSchema)
const PendingLocation = mongoose.models.PendingLocation || mongoose.model("PendingLocation", LocationSchema)

export { Location, PendingLocation }
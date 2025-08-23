import mongoose, { Schema, Document } from "mongoose"

const TimeSpanSchema = new mongoose.Schema({
    openTime: {
        type: Number,
        min: 1,
        max: 24,
        required: true
    },
    closeTime: {
        type: Number,
        min: 1,
        max: 24,
        required: true
    }
})

const ScheduleSchema = new mongoose.Schema({
    weekday: { type: TimeSpanSchema, required: false },
    saturday: { type: TimeSpanSchema, required: false },
    sunday: { type: TimeSpanSchema, required: false }
})

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
    lessons: Boolean,
    schedule: { type: ScheduleSchema, required: false },
    outdoorCourts: {
        type: Number,
        required: false
    },
    indoorCourts: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    }
})

const Location = mongoose.models.Location || mongoose.model("Location", LocationSchema)
const PendingLocation = mongoose.models.PendingLocation || mongoose.model("PendingLocation", LocationSchema)

export { Location, PendingLocation }
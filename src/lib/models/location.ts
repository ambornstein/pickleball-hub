import mongoose, { Schema, Document } from "mongoose"

const LocationSchema = new mongoose.Schema({
    coordinates: {
        type: [Number],
        required: true
    },
    name: String,
    address: String,
    phoneNumber: String,
    url: String,
    zipcode: {type: Number, min: 77002, max: 77099, required: true},
    openPlay: Boolean,
    reservations: Boolean,
    lessons: Boolean
})

export default mongoose.models.Location || mongoose.model("Location", LocationSchema)
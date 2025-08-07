import mongoose, { Schema, Document } from "mongoose"

const LocationSchema = new mongoose.Schema({
    coordinates: {
        type: [Number],
        required: false
    },
    name: String,
    address: String,
    siteUrl: String,
    zipCode: {type: Number, min: 77002, max: 77099, required: true},
    openPlay: Boolean,
    reservation: Boolean,
    lessons: Boolean,

})
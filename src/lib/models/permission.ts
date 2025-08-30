import mongoose, { Schema } from "mongoose";
import { Location } from '@/lib/models/location'

const locationSchema = Location;

const PermissionSchema: Schema = new mongoose.Schema({
    email: String,
    role: String,
    managedLocations: [{ type: Schema.Types.ObjectId, ref: 'Location'}]
})

export default mongoose.models.Permissions || mongoose.model('Permissions', PermissionSchema)
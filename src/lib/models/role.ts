import { Schema } from "mongoose";

const PermissionSchema: Schema = new mongoose.Schema({
    email: String,
    type: { enum: ['User', 'Admin', 'Editor'] },
    managedLocations: [{ type: Schema.Types.ObjectId, ref: 'Location'}]
})

export default mongoose.models.Permissions || mongoose.model('Permissions', PermissionSchema)
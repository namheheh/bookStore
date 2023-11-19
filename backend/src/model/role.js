import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model("Role", roleSchema);

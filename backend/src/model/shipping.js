import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
    // 
},
    {
        timestamps: true,
        versionKey: false
    }
)
export default mongoose.model("Shipping", shippingSchema);
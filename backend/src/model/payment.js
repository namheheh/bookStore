import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
        versionKey: false
    })
export default mongoose.model("Payment", paymentSchema);



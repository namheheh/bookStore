import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
    products: {
        type: [String],
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    dateCreate: {
        type: String,
    },
    total: {
        type: Number,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    Note: {
        type: String,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    tel: {
        type: Number,
        required: true,
    },
    voucherCode: {
        type: String,
    },
    shipping: {
        type: String,
        required: true,
    },
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
    },
    PaymentAmount: {
        type: Number,
    },
}, {
    timestamps: true,
    versionKey: false,
});
export default mongoose.model("Checkout", checkoutSchema);
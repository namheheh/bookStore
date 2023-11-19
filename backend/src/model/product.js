import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: Number,
    images: { type: Array, required: true },
    price: {
        type: Number,
        required: true
    },
    price_sale: Number,
    publisher: String,
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
    },
    content: String,
    description: String,
    rate: Number
},
    {
        timestamps: true,
        versionKey: false
    })

export default mongoose.model("Product", productSchema);

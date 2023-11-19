import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    id_product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    rate: {
        type: Number,
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
        versionKey: false
    })

export default mongoose.model("Comment", commentSchema);


// // const mongoose = require("mongoose");

// // const commentSchema = new mongoose.Schema({
// //   user: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "User",
// //     required: true,
// //   },
// // //   product: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: "Product", // Thay "Product" bằng tên của model sản phẩm (product)
// // //     required: true,
// // //   },
// //   content: {
// //     type: String,
// //     required: true,
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now,
// //   },
// // });
// // export default mongoose.model("Comment", commentSchema);

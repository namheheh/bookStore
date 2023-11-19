import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    userName: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true
    },
    gender: {
      type: String,
      // require: true
    },
    aboutme: {
      type: String,
    },
    address: {
      type: String,
    },
    tel: {
      type: String
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role_id: {
      type: mongoose.Types.ObjectId,
      ref: "Role"
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);

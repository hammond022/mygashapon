import mongoose, { Schema } from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    creator: { type: String, required: true },
    text: { type: String, default: "" },
    image: { type: String, default: "" },
    currentOwner: { type: String, required: true },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 },
    inventory: [itemSchema],
  },
  { timestamps: true }
);
// this might need attention, userSchema is mentioned but this is -
// - treated as a schema to be used everywhere
const User = mongoose.model("User", userSchema);

export default User;

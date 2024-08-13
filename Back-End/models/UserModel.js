import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    id: { type: Number, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    online: { type: Boolean, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

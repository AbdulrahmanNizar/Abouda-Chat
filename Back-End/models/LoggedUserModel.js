import mongoose from "mongoose";

const Schema = mongoose.Schema;
const loggedUserSchema = new Schema(
  {
    id: { type: Number, required: true },
    logged: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const loggedUser = mongoose.model("LoggedUsers", loggedUserSchema);
export default loggedUser;

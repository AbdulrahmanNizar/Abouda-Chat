import mongoose from "mongoose";

const Schema = mongoose.Schema;
const newFriendSchema = new Schema(
  {
    NewFriendForId: { type: Number, required: true },
    NewFriendNameId: { type: Number, required: true },
  },
  { timestamps: true }
);

const newFriend = mongoose.model("NewFriend", newFriendSchema);
export default newFriend;

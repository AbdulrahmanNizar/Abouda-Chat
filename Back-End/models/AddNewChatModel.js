import mongoose from "mongoose";

const Schema = mongoose.Schema;
const newChatSchema = new Schema(
  {
    id: { type: Number, required: true },
    fromWhoId: { type: Number, required: true },
    toWhoId: { type: Number, required: true },
    theMessage: { type: String, required: true },
    messageTime: { type: String, required: true },
    messageDate: { type: String, required: true },
    edited: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const newChat = mongoose.model("NewChat", newChatSchema);
export default newChat;

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const newMessageInGroupSchema = new Schema(
  {
    id: { type: Number, required: true },
    fromWhoId: { type: String, required: true },
    theGroupId: { type: Number, required: true },
    theMessage: { type: String, required: true },
    messageTime: { type: String, required: true },
    messageDate: { type: String, required: true },
    edited: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const newMessageInGroup = mongoose.model(
  "newMessageInGroup",
  newMessageInGroupSchema
);
export default newMessageInGroup;

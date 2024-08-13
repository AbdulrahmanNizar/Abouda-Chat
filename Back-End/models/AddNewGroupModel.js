import mongoose from "mongoose";

const Schema = mongoose.Schema;
const newGroupSchema = new Schema(
  {
    id: { type: Number, required: true },
    theGroupName: { type: String, required: true },
    theCreater: { type: String, required: true },
    theGroupMates: { type: Object, required: true },
    theGroupAdmins: { type: Object, required: true },
    groupTime: { type: String, required: true },
    groupDate: { type: String, required: true },
  },
  { timestamps: true }
);

const newGroup = mongoose.model("NewGroup", newGroupSchema);
export default newGroup;

import * as mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_id: { type: Number },
  username: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  is_deleted: { type: Boolean, default: false }
});

export default mongoose.model("users", schema);

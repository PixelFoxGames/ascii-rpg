import * as mongoose from "mongoose";
import UsersMethods from "./users.methods";

const schema = new mongoose.Schema({
  user_id: { type: Number, index: true, unique: true },
  username: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  is_deleted: { type: Boolean, default: false },
});

schema.post("save", UsersMethods.inventory);
schema.post("findOne", UsersMethods.inventory);
schema.post("find", UsersMethods.inventories);

export const UserSchema = schema;

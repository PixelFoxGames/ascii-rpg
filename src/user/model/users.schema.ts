import * as mongoose from "mongoose";
import UsersMiddlewares from "./users.middlewares";

const schema = new mongoose.Schema({
  user_id: { type: Number, index: true, unique: true },
  username: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  is_deleted: { type: Boolean, default: false },
  inventory: { type: mongoose.Schema.Types.ObjectId, ref: "inventories" },
});

schema.pre("save", UsersMiddlewares.save);

export const UserSchema = schema;

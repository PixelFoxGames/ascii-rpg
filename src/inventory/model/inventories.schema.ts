import * as mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_id: { type: Number, index: true, unique: true },
  is_deleted: { type: Boolean, default: false },
});

export const InventoriesSchema = schema;

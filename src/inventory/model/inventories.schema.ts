import * as mongoose from "mongoose";
import { CurrencyInventory } from "./inventories.currencies.types";
import InventoriesMethods from "./inventories.methods";

const schema = new mongoose.Schema({
  user_id: { type: Number, index: true, unique: true },
  _currencies: { type: Object, default: new CurrencyInventory() },
  is_deleted: { type: Boolean, default: false },
});

schema.virtual("currencies").get(InventoriesMethods.currencies);

export const InventoriesSchema = schema;

import mongoose from "mongoose";
import { IInventoryDocument } from "./inventories.types";
import { InventoriesSchema } from "./inventories.schema";

export default mongoose.model<IInventoryDocument>("inventories", InventoriesSchema);

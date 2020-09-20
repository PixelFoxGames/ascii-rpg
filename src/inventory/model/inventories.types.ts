import { Document } from "mongoose";

export interface IInventory {
  user_id?: number;
}

export interface IInventoryDocument extends IInventory, Document {}

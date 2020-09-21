import { Document } from "mongoose";
import { CurrencyInventory } from "./inventories.currencies.types";

export interface IInventory {
  user_id?: number;
  currencies?: CurrencyInventory;
}

export interface IInventoryDocument extends IInventory, Document {}

import { Document } from "mongoose";
import { IInventory } from "../../inventory/model/inventories.types";

export interface IUser {
  user_id?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_deleted?: boolean;
  inventory?: IInventory;
}

export interface IUserDocument extends IUser, Document {}

import { Document } from "mongoose";
import { IInventoryDocument } from "../../inventory/model/inventories.types";

export interface IUser {
  user_id?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_deleted?: boolean;
  inventory?: IInventoryDocument;
}

export interface IUserDocument extends IUser, Document {}

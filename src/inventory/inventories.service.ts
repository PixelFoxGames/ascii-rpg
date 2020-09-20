import Inventory from "./model/inventories.model";
import { IUserDocument } from "../user/model/users.types";

export default class InventoriesService {
  static async getByUserID(userID: number): Promise<IUserDocument> {
    return await Inventory.findOne({ user_id: userID });
  }

  static async get(userID: number): Promise<IUserDocument> {
    const existing = await this.getByUserID(userID);
    return existing || (await this.create(userID));
  }

  static async create(userID: number): Promise<IUserDocument> {
    return await Inventory.create({ user_id: userID });
  }
}

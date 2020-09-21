import Inventory from "./model/inventories.model";
import { IInventoryDocument } from "./model/inventories.types";

export default class InventoriesService {
  static async getByUserID(userID: number): Promise<IInventoryDocument> {
    const existing = await await Inventory.findOne({ user_id: userID });
    return existing || (await this.create(userID));
  }

  static async create(userID: number): Promise<IInventoryDocument> {
    return await Inventory.create({ user_id: userID });
  }
}

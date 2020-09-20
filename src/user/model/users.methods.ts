import { IUserDocument } from "./users.types";
import InventoriesService from "../../inventory/inventories.service";

export default class UsersMethods {
  static get inventories() {
    return async (users: IUserDocument[], next) => {
      if (!users || !users.length) {
        return next();
      }
      for (const user of users) {
        await this.getInventory(user);
      }
      next();
    };
  }

  static get inventory() {
    return async (user: IUserDocument, next) => {
      if (!user) {
        return next();
      }
      await this.getInventory(user);
      next();
    };
  }

  static async getInventory(user: IUserDocument): Promise<IUserDocument> {
    user.inventory = await InventoriesService.get(user.user_id);
    return user;
  }
}

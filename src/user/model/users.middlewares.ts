import { HookNextFunction } from "mongoose";
import { IUserDocument } from "./users.types";
import InventoriesService from "../../inventory/inventories.service";

export default class UsersMiddlewares {
  static get save(): (next: HookNextFunction) => Promise<any> {
    return async function (this: IUserDocument, next: HookNextFunction) {
      this.inventory = this.isNew ? await InventoriesService.getByUserID(this.user_id) : await this.inventory.save();
      next();
    };
  }
}

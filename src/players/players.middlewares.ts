import { HookNextFunction } from "mongoose";
import { PlayerDoc } from "./players.schema";
import { Inventory } from "../inventories/inventories.schema";

export default class PlayersMiddlewares {
  static get save(): (next: HookNextFunction) => Promise<any> {
    return async function(this: PlayerDoc, next: HookNextFunction) {
      this.inventory = this.inventory || (await Inventory.default());
      next();
    };
  }

  static get findOne(): (doc: PlayerDoc, next: HookNextFunction) => Promise<void> {
    return async function(this: PlayerDoc, doc: PlayerDoc, next: HookNextFunction) {
      await doc?.inventory?.refresh();
      await doc?.stats?.refresh();
      next();
    };
  }
}

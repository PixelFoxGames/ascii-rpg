import { Inventory, InventoryDoc } from "./inventories.schema";

export default class InventoriesStatics {
  static get statics() {
    return {
      default: () => this._default()
    };
  }

  private static _default(): Promise<InventoryDoc> {
    return Inventory.create({
      gold: { current: 0, max: 99000000, step: 1, last: Date.now() }
    });
  }
}

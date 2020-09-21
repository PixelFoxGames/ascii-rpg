import { CurrencyInventory } from "./inventories.currencies.types";

export default class InventoriesMethods {
  static get currencies(): (value, virtual, doc) => void {
    return (value, virtual, doc) => new CurrencyInventory(doc._currencies);
  }
}

import { PlayerDoc } from "./players.schema";
import { ClassDoc } from "../classes/classes.schema";
import { InventoryDoc } from "../inventories/inventories.schema";
import { StatsDoc } from "../stats/stats.schema";

export default class PlayersVirtuals {
  static get getClass() {
    return function(this: PlayerDoc) {
      return this._class;
    };
  }

  static get setClass() {
    return function(this: PlayerDoc, value: ClassDoc) {
      this._class = value;
    };
  }

  static get getInventory() {
    return function(this: PlayerDoc) {
      return this._inventory;
    };
  }

  static get setInventory() {
    return function(this: PlayerDoc, value: InventoryDoc) {
      this._inventory = value;
    };
  }

  static get getStats() {
    return function(this: PlayerDoc) {
      return this._stats;
    };
  }

  static get setStats() {
    return function(this: PlayerDoc, value: StatsDoc) {
      this._stats = value;
    };
  }
}

import _ from "lodash";
import Environment from "../helpers/environment";
import { InventoryDoc } from "./inventories.schema";

export default class InventoriesMethods {
  static get refresh(): () => Promise<InventoryDoc> {
    return function(this: InventoryDoc) {
      this._refresh("gold");
      return this.save();
    };
  }

  static get _refresh(): (field: string) => InventoryDoc {
    return function(this: InventoryDoc, field: string) {
      const passed: number = Date.now() - this[field].last;
      const steps: number = Math.trunc(passed / Environment.STEP_TIME_MS);
      if (steps <= 0) {
        return this;
      }

      const current: number = this[field].current;
      const last: number = this[field].last;
      this[field].last = steps * Environment.STEP_TIME_MS + last;
      this[field].current = _.clamp(current + steps * this[field].step, this[field].max);
      this.markModified(field);
      return this;
    };
  }
}

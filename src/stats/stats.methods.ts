import _ from "lodash";
import Environment from "../helpers/environment";
import { Fields } from "../constants";
import { StatsDoc } from "./stats.schema";

export default class StatsMethods {
  static get gain(): (field: string, amount: number) => Promise<StatsDoc> {
    return function(this: StatsDoc, field: string, amount: number) {
      if (field === Fields.XP) {
        this._gainXP(Fields.XP, amount);
      }
      return this.save();
    };
  }

  static get _gainXP(): (field: string, amount: number) => StatsDoc {
    return function(this: StatsDoc, field: string, amount: number) {
      (this[field].current as number) += amount;
      while (this[field].current >= this.xp.next) {
        this[field].current -= this[field].next;
        this[field].next *= 1.10;
        this.level++;
      }
      this.markModified(Fields.XP);
      return this;
    };
  }

  static get refresh() {
    return function(this: StatsDoc) {
      this._refresh("hp");
      this._refresh("soul");
      return this.save();
    };
  }

  static get _refresh() {
    return function(this: StatsDoc, field: string) {
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

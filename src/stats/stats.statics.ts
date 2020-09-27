import { Stats, StatsDoc } from "./stats.schema";
import { ClassDoc } from "../classes/classes.schema";

export default class StatsStatics {
  static get statics() {
    return {
      default: (_class: ClassDoc) => this._default(_class)
    };
  }

  private static _default(_class: ClassDoc): Promise<StatsDoc> {
    return Stats.create({
      level: 1,
      xp: { current: 0, next: 10 },
      hp: { current: _class.baseHP.max, max: _class.baseHP.max, step: _class.baseHP.step, last: Date.now() },
      soul: { current: _class.baseSoul.max, max: _class.baseSoul.max, step: _class.baseSoul.step, last: Date.now() }
    });
  }
}

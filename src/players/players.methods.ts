import { PlayerDoc } from "./players.schema";
import { Class } from "../classes/classes.schema";
import { Stats } from "../stats/stats.schema";

export default class PlayersMethods {
  static get updateName(): (name: string) => Promise<any> {
    return async function(this: PlayerDoc, name: string) {
      this.name = name;
      return await this.save();
    };
  }

  static get changeClass(): (className: string) => Promise<any> {
    return async function(this: PlayerDoc, className: string) {
      if (!Class.isClassNameAvailable(className)) {
        return this;
      }

      await this.class?.deleteOne();
      await this.stats?.deleteOne();

      this.class = await Class.createClassFromName(className);
      this.stats = await Stats.default(this.class);
      return await this.save();
    };
  }
}

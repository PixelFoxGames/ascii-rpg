import { Class, ClassDoc } from "./classes.schema";
import GameData from "../gamedata/game.data";

export default class ClassesStatics {
  static get statics() {
    return {
      createClassFromName: (name: string) => this._classFromName(name),
      isClassNameAvailable: (name: string) => this._isClassNameAvailable(name)
    };
  }

  private static _isClassNameAvailable(name: string): boolean {
    return Object.keys(GameData.classes)
      .includes(name);
  }

  private static _classFromName(name: string): Promise<ClassDoc> {
    return Class.create(GameData.classes[name]);
  }
}

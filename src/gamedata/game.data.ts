import * as Classes from "./config.classes.json";
import { ClassDoc } from "../classes/classes.schema";

interface _Classes {
  warrior: ClassDoc;
  mage: ClassDoc;
}

export default abstract class GameData {
  static classes: _Classes = Classes as _Classes;
};

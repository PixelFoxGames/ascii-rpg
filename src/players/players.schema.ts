import { createSchema, ExtractDoc, ExtractProps, Type, typedModel } from "ts-mongoose";
import autopopulate from "mongoose-autopopulate";
import { Collections, Methods } from "../constants";
import PlayersVirtuals from "./players.virtuals";
import PlayersMiddlewares from "./players.middlewares";
import PlayersMethods from "./players.methods";
import { ClassDoc, ClassType } from "../classes/classes.schema";
import { InventoryDoc, InventoryType } from "../inventories/inventories.schema";
import { StatsDoc, StatsType } from "../stats/stats.schema";

export const PlayerSchema = createSchema({
  user_id: Type.number({ required: true, index: true, unique: true }),
  username: Type.string({ unique: true }),
  name: Type.string({ unique: true }),
  first_name: Type.string(),
  last_name: Type.string(),
  _class: ClassType,
  _inventory: InventoryType,
  _stats: StatsType,
  ...({} as {
    updateName: (name: string) => Promise<any>;
    class: ClassDoc;
    changeClass: (className: string) => Promise<any>;
    inventory: InventoryDoc;
    stats: StatsDoc;
  })
});

PlayerSchema.plugin(autopopulate);

PlayerSchema.pre(Methods.SAVE, PlayersMiddlewares.save);
PlayerSchema.post(Methods.FIND_ONE, PlayersMiddlewares.findOne);

PlayerSchema.virtual(Collections.CLASS).get(PlayersVirtuals.getClass).set(PlayersVirtuals.setClass);
PlayerSchema.virtual(Collections.INVENTORY).get(PlayersVirtuals.getInventory).set(PlayersVirtuals.setInventory);
PlayerSchema.virtual(Collections.STATS).get(PlayersVirtuals.getStats).set(PlayersVirtuals.setStats);

PlayerSchema.methods.updateName = PlayersMethods.updateName;
PlayerSchema.methods.changeClass = PlayersMethods.changeClass;

export const Player = typedModel(Collections.PLAYER, PlayerSchema);
export type PlayerDoc = ExtractDoc<typeof PlayerSchema>;
export type PlayerProps = ExtractProps<typeof PlayerSchema>;

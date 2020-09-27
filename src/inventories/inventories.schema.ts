import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";
import { Collections } from "../constants";
import InventoriesStatics from "./inventories.statics";
import InventoriesMethods from "./inventories.methods";

export const InventoriesSchema = createSchema({
  gold: {
    max: Type.number({ required: true }),
    step: Type.number({ required: true }),
    current: Type.number({ required: true }),
    last: Type.number({ required: true })
  },
  ...({} as {
    refresh: () => any;
    _refresh: (field: string) => any;
  })
});

InventoriesSchema.methods.refresh = InventoriesMethods.refresh;
InventoriesSchema.methods._refresh = InventoriesMethods._refresh;

export const Inventory = typedModel(Collections.INVENTORY, InventoriesSchema, Collections.INVENTORY, false, InventoriesStatics.statics);
export type InventoryDoc = ExtractDoc<typeof InventoriesSchema>;
export const InventoryType = Type.ref(Type.objectId({ autopopulate: true })).to(Collections.INVENTORY, InventoriesSchema);

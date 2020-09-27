import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";
import { Collections } from "../constants";
import StatsStatics from "./stats.statics";
import StatsMethods from "./stats.methods";

export const StatsSchema = createSchema({
  level: Type.number({ required: true, default: 1 }),
  xp: Type.object().of({
    current: Type.number({ default: 0 }),
    next: Type.number({ required: true })
  }),
  hp: Type.object().of({
    max: Type.number({ required: true }),
    step: Type.number({ required: true }),
    current: Type.number({ required: true }),
    last: Type.number({ default: () => Date.now() })
  }),
  soul: Type.object().of({
    max: Type.number({ required: true }),
    step: Type.number({ required: true }),
    current: Type.number({ required: true }),
    last: Type.number({ default: () => Date.now() })
  }),
  ...({} as {
    gain: (field: string, amount: number) => any
    _gainXP: (field: string, amount: number) => any
    refresh: () => any;
    _refresh: (field: string) => any;
  })
});

StatsSchema.methods.gain = StatsMethods.gain;
StatsSchema.methods._gainXP = StatsMethods._gainXP;
StatsSchema.methods.refresh = StatsMethods.refresh;
StatsSchema.methods._refresh = StatsMethods._refresh;

export const Stats = typedModel(Collections.STATS, StatsSchema, Collections.STATS, false, StatsStatics.statics);
export type StatsDoc = ExtractDoc<typeof StatsSchema>;
export const StatsType = Type.ref(Type.objectId({ autopopulate: true })).to(Collections.STATS, StatsSchema);

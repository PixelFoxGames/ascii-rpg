import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";
import { Collections } from "../constants";
import ClassesStatics from "./classes.statics";

export const ClassesSchema = createSchema({
  name: Type.string({ required: true }),
  baseHP: {
    current: Type.number({ required: true }),
    max: Type.number({ required: true }),
    step: Type.number({ required: true })
  },
  baseSoul: {
    current: Type.number({ required: true }),
    max: Type.number({ required: true }),
    step: Type.number({ required: true })
  }
});

export const Class = typedModel(Collections.CLASS, ClassesSchema, Collections.CLASS, false, ClassesStatics.statics);
export type ClassDoc = ExtractDoc<typeof ClassesSchema>;
export const ClassType = Type.ref(Type.objectId({ autopopulate: true })).to(Collections.CLASS, ClassesSchema);

import mongoose, { Mongoose } from "mongoose";

import Environment from "./environment";

import Debug from "debug";

const debug = Debug("ascii-rpg:helpers:db");

export default class DB {
  private static MONGOOSE: Mongoose;
  private static readonly OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  async connect(): Promise<Mongoose> {
    debug("setting up db...");
    return DB.MONGOOSE ? DB.MONGOOSE : await this._create();
  }

  private async _create(): Promise<Mongoose> {
    return await mongoose.connect(Environment.DB_URI, DB.OPTIONS).then((mongoose) => {
      mongoose["mocked"] ? debug("[Mock]DB Connected!") : debug("DB Connected!");
      DB.MONGOOSE = mongoose;
      return DB.MONGOOSE;
    });
  }
}

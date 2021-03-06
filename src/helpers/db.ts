import Debug from "debug";
import mongoose, { Mongoose } from "mongoose";
import Environment from "./environment";

const debug = Debug("ascii-rpg:helpers:db");

export default class DB {
  private static MONGOOSE: Mongoose;
  private static readonly OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

  async connect(): Promise<Mongoose> {
    debug("setting up db...");
    return DB.MONGOOSE ? DB.MONGOOSE : await this._create();
  }

  async nuke(): Promise<void> {
    if (!Environment.isTEST && !Environment.FORCE_NUKE) {
      debug("Trying to nuke non TEST environment, aborting...");
      throw new Error("Trying to nuke non TEST environment, aborting...");
    }

    if (!DB.MONGOOSE) {
      return await this.connect().then(() => this.nuke());
    }

    return await DB.MONGOOSE.connection.db.dropDatabase();
  }

  private async _create(): Promise<Mongoose> {
    return await mongoose.connect(Environment.DB_URI, DB.OPTIONS).then((mongoose) => {
      Environment.isTEST ? debug("[Mock]DB Connected!") : debug("DB Connected!");
      DB.MONGOOSE = mongoose;
      return DB.MONGOOSE;
    });
  }
}

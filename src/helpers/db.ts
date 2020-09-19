import * as mongoose from "mongoose";

import Environment from "./environment";

const debug = require("debug")("ascii-rpg:helpers:db");

export default class DB {
  private static MONGOOSE;
  private static OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

  async connect(): Promise<void> {
    debug("setting up db...");
    if (DB.MONGOOSE) {
      return DB.MONGOOSE;
    }

    return mongoose.connect(Environment.DB_URI, DB.OPTIONS)
      .then(mongoose => {
        debug("DB Connected!");
        DB.MONGOOSE = mongoose;
        return DB.MONGOOSE;
      });
  }
}

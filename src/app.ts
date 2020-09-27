import "./extensions";
import express from "express";
import bodyParser from "body-parser";

import Environment from "./helpers/environment";
import Logger from "./middlewares/logger";

import PlayersRouter from "./players/players.router";
import _404Router from "./_404/_404.router";
import DB from "./helpers/db";
import Bot from "./telegram/bot";

import Debug from "debug";

const debug = Debug("ascii-rpg:app");

export default class App {
  public app: express.Application;

  private readonly db: DB = new DB();
  private readonly bot: Bot = new Bot();
  private routers = {};
  private middlewares = {};

  constructor() {
    this.app = express();
    this.setup();
    this.middlewaresSetup();
    this.routesSetup();
    this.bot.setup();
  }

  async start(): Promise<number> {
    debug("starting...");
    await this.db.connect();

    return await new Promise((resolve) => {
      return this.app.listen(Environment.PORT, () => {
        debug("app started");
        return resolve(Environment.PORT);
      });
    });
  }

  private setup(): void {
    debug("setting up app...");
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private middlewaresSetup() {
    debug("setting up middlewares...");
    this.middlewares["logger"] = new Logger(this.app);
  }

  private routesSetup() {
    debug("setting up routes...");
    this.routers["user"] = new PlayersRouter(this.app);
    this.routers["404"] = new _404Router(this.app);
  }
}

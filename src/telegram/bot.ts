import * as TelegramBot from "node-telegram-bot-api";
import Environment from "../helpers/environment";
import StartCommand from "./commands/start.command";

const debug = require("debug")("ascii-rpg:telegram:bot");

export default class Bot {
  private bot: TelegramBot = new TelegramBot(Environment.TELEGRAM_API_TOKEN, { polling: true });
  private commands = {};

  setup() {
    debug("setting up telegram bot...");
    this.commands["start"] = new StartCommand(this.bot);
  }
}

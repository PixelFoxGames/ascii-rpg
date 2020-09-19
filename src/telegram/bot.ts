import { Telegraf } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import Environment from "../helpers/environment";
import StartCommand from "./commands/start.command";
import Debug from "debug";

const debug = Debug("ascii-rpg:telegram:bot");

export default class Bot {
  private readonly bot: Telegraf<TelegrafContext> = new Telegraf(Environment.TELEGRAM_API_TOKEN);
  private commands = {};

  setup() {
    debug("setting up telegram bot...");
    this.commands["start"] = new StartCommand(this.bot);

    this.bot.launch().then(() => debug("telegram bot started"));
  }
}

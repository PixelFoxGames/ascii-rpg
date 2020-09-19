import * as TelegramBot from "node-telegram-bot-api";
import TelegramContext from "../telegram-context";

const debug = require("debug")("ascii-rpg:telegram:bot");

export default abstract class Command {
  private readonly bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
    this.setup();
  }

  abstract setup();

  command(command: RegExp, execute: (context: TelegramContext) => void) {
    this.bot.onText(command, async (message: TelegramBot.Message, match: RegExpExecArray | null) => {
      debug(`[${message.from.id}:@${message.from.username}] ${match[0]}`);
      return execute(new TelegramContext(this.bot, message, match, command));
    });
  }
}

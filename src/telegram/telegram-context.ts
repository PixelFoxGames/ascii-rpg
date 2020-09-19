import * as TelegramBot from "node-telegram-bot-api";

const debug = require("debug")("ascii-rpg:helpers:telegram-context");

export default class TelegramContext {
  private bot: TelegramBot;
  private message: TelegramBot.Message;
  private match: RegExpExecArray;
  private command: RegExp;

  constructor(bot: TelegramBot, message: TelegramBot.Message, match: RegExpExecArray, command: RegExp) {
    this.bot = bot;
    this.message = message;
    this.match = match;
    this.command = command;
  }

  get id() {
    return this.message.from.id;
  }

  get username() {
    return `@${this.message.from.username}`;
  }

  get name() {
    return {
      first: this.message.from.first_name,
      last: this.message.from.last_name
    };
  }

  async send(text: string) {
    debug(`sending message to ${this.id}:${this.username}`);
    await this.bot.sendMessage(this.id, text);
  }
}

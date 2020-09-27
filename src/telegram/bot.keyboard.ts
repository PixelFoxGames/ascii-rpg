import { Markup } from "telegraf";
import * as tt from "telegraf/typings/telegram-types";
import BotContext from "./bot.context";

export default class BotKeyboard {
  private readonly rows: tt.InlineKeyboardButton[][] | any = [];
  private ctx: BotContext;
  private current: number;

  static get row(): BotKeyboard {
    return new BotKeyboard().row;
  }

  get row(): BotKeyboard {
    this.current = this.current ? this.current + 1 : 0;
    this.rows[this.current] = [];
    return this;
  }

  get keyboard(): tt.ExtraReplyMessage {
    return Markup.inlineKeyboard(this.rows).extra();
  }

  context(ctx: BotContext): BotKeyboard {
    this.ctx = ctx;
    return this;
  }

  callback(text: string, action: string): BotKeyboard {
    this.rows[this.current].push(Markup.callbackButton(text, `${action}:${Date.now()}`));
    return this;
  }

  async reply(text: string): Promise<tt.Message> {
    return await this.ctx.reply(text, this.keyboard);
  }

  async next(text: string): Promise<BotContext> {
    return await this.ctx.next(text, this.keyboard);
  }

  async back(text: string): Promise<BotContext> {
    return await this.ctx.back(text, this.keyboard);
  }

  async leave(text: string): Promise<BotContext> {
    return await this.ctx.leave(text);
  }
}

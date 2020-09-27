import { Context } from "telegraf";
import * as tt from "telegraf/typings/telegram-types";
import PlayersService from "../players/players.service";
import { PlayerProps } from "../players/players.schema";
import BotKeyboard from "./bot.keyboard";
import { Commands } from "../constants";

export default class BotContext extends Context {
  session: any;
  wizard: any;
  scene: any;

  get args() {
    return this.message.text.split(" ");
  }

  get keyboard() {
    return BotKeyboard.row.context(this);
  }

  get confirm() {
    return this.keyboard
      .callback("✅", Commands.COMMAND_YES)
      .callback("⛔", Commands.COMMAND_NO);
  }

  temp(field: string, value?: any) {
    this.session.temp = this.session.temp || {};
    if (value !== undefined) this.session.temp[field] = value;
    return this.session.temp[field];
  }

  async back(text: string, extra: tt.ExtraReplyMessage = {}): Promise<BotContext> {
    this.reply(text, extra);
    return this.wizard.back();
  }

  async reply(text: string, extra: tt.ExtraReplyMessage = {}): Promise<tt.Message> {
    extra.parse_mode = "MarkdownV2";
    return this.log(await super.reply(text, extra));
  }

  async editMessageText(text: string, extra: tt.ExtraEditMessage = {}): Promise<tt.Message | boolean> {
    extra.parse_mode = "MarkdownV2";
    return this.log(await super.editMessageText(text, extra));
  }

  async next(text: string, extra: tt.ExtraReplyMessage = {}): Promise<BotContext> {
    this.reply(text, extra);
    return this.wizard.next();
  }

  async leave(text: string, extra: tt.ExtraReplyMessage = {}): Promise<BotContext> {
    this.reply(text, extra);
    return this.scene.leave();
  }

  async player() {
    const userID = this.message?.from?.id || this.update?.callback_query?.from?.id;
    const username = this.message?.from?.username || this.update?.callback_query?.from?.username;
    const player: PlayerProps = { user_id: userID, username: `@${username}` } as PlayerProps;
    return await PlayersService.getUpdate(player);
  }

  log(reply: tt.Message | any) {
    if (!reply) {
      return reply;
    }

    this.session = { ...this.session };
    this.session.last_message_id = reply.message_id;
    this.session.counter = ((this.session.counter as number) + 1) || 0;
    return reply;
  }
}

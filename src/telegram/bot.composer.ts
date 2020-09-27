import { Composer } from "telegraf";
import BotContext from "./bot.context";

export default class BotComposer {
  readonly composer = new Composer<BotContext>();

  static get decision() {
    return new BotComposer();
  }

  action(trigger: string, middleware: (ctx: BotContext) => Promise<BotContext>) {
    this.composer.action(new RegExp(trigger), middleware);
    return this;
  }

  other(middleware: (ctx) => any) {
    this.composer.on("message", middleware);
    return this;
  }
}

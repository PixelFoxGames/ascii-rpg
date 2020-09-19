import Debug from "debug";
import { Telegraf } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";

const debug = Debug("ascii-rpg:telegram:bot");

export default abstract class Command {
  private readonly bot: Telegraf<TelegrafContext>;

  constructor(bot: Telegraf<TelegrafContext>) {
    this.bot = bot;
    this.setup();
  }

  abstract setup();

  command(command: string, execute: (ctx: TelegrafContext) => void) {
    this.bot.command(command, (ctx, next) => {
      debug(command);
      return execute(ctx);
    });
  }
}

import Debug from "debug";
import Telegraf, { Stage } from "telegraf";
import { TelegrafMongoSession } from "telegraf-session-mongodb";
import Environment from "../helpers/environment";
import BotContext from "./bot.context";
import { BotOptions } from "./bot.options";
import Command from "./commands/command";

const debug = Debug("ascii-rpg:telegram:bot");

export default class BotTelegram extends Telegraf<BotContext> {
  readonly stages: Command[] = [];

  constructor(token: string = Environment.TELEGRAM_API_TOKEN, options: BotOptions = { contextType: BotContext }) {
    super(token, options);
  }

  private static _debug(ctx: BotContext) {
    const from = ctx.message?.from?.username || ctx.update?.callback_query?.from?.username;
    return Debug(`ascii-rpg:@${from}`);
  }

  async middlewares(): Promise<BotTelegram> {
    await TelegrafMongoSession.setup(this, Environment.DB_URI);

    if (this.stages.length > 0) {
      const wizards = this.stages.map(stage => stage.wizard);
      this.use(new Stage(wizards).middleware());
      this.stages.forEach(stage => stage.commands());
    }

    return this;
  }

  async run(): Promise<BotTelegram> {
    await this.middlewares();
    super.catch((err, ctx: BotContext) => debug("error", ctx.updateType, err));
    await super.launch();
    return this;
  }

  debug(ctx: BotContext) {
    BotTelegram._debug(ctx)(ctx.session, ctx.update?.message?.text || ctx.update?.callback_query?.data);
  }

  stage(stage: Command) {
    this.stages.push(stage);
  }
}

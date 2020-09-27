import WizardScene from "telegraf/scenes/wizard";
import BotContext from "../bot.context";
import BotTelegram from "../bot.telegram";
import BotComposer from "../bot.composer";

export default abstract class Command {
  readonly wizard: WizardScene<BotContext>;
  private readonly telegram: BotTelegram;

  constructor(telegram: BotTelegram) {
    this.wizard = this.scene();
    this.telegram = telegram;
    this.telegram.stage(this);
  }

  abstract commands();

  abstract scene(): WizardScene;

  get decision() {
    return BotComposer.decision;
  }

  enter(command: string, scene: string) {
    this.telegram.command(command, (ctx: BotContext) => ctx.scene.enter(scene));
  }

  next(text: string) {
    return (ctx: BotContext) => {
      ctx.reply(text);
      return ctx.wizard.next();
    };
  }
}

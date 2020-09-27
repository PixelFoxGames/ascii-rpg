import { Composer } from "telegraf";
import WizardScene from "telegraf/scenes/wizard";
import BotContext from "../../bot.context";
import Command from "../command";
import { Classes, Commands, Fields } from "../../../constants";
import Texts from "../../texts";

export default class StartCommand extends Command {
  get step_0() {
    return (ctx: BotContext) => ctx.next(`\`Hello adventure, nice to see you here 😁\`
\`What will be your hero name:\``);
  }

  get step_1() {
    return async (ctx: BotContext) => {
      ctx.temp(Fields.NAME, ctx.args[0]);

      return await ctx.confirm
        .next(`\`Your hero will be called ${ctx.temp(Fields.NAME)}\`
\`Are you sure?\``);
    };
  }

  get step_2(): Composer<BotContext> {
    return this.decision
      .action(Commands.COMMAND_NO, (ctx: BotContext) => ctx.back(`\`Ok, lets try again...\`
\`What will be your hero name:\``))
      .action(Commands.COMMAND_YES, (ctx: BotContext) => ctx.keyboard
        .callback("🤺", Commands.COMMAND_WARRIOR)
        .callback("🧙", Commands.COMMAND_MAGE)
        .next(`\`So now ill call you ${ctx.temp(Fields.NAME)}\`
\`You need to choose your hero class:\`
\`🤺 WARRIOR: physical stronger, more hp\`
\`🧙 MAGE: magic adept, more soul\``))
      .other((ctx: BotContext) => ctx.confirm
        .reply(`\`Select a valid option!\`
\`Are you sure to call your hero ${ctx.temp(Fields.NAME)}?\``))
      .composer;
  }

  get step_3() {
    return this.decision
      .action(Commands.COMMAND_WARRIOR, (ctx: BotContext) => {
        ctx.temp(Fields.CLASS, Classes.WARRIOR);
        return ctx.confirm.next(`\`You will be a ${ctx.temp(Fields.CLASS)}, are you sure?!\``);
      })
      .action(Commands.COMMAND_MAGE, (ctx: BotContext) => {
        ctx.temp(Fields.CLASS, Classes.MAGE);
        return ctx.confirm.next(`\`You will be a ${ctx.temp(Fields.CLASS)}, are you sure?!\``);
      })
      .other((ctx: BotContext) => ctx.keyboard
        .callback("🤺", Commands.COMMAND_WARRIOR)
        .callback("🧙", Commands.COMMAND_MAGE)
        .reply(`\`Select a valid option!\`
\`Choose a class:\`
\`🤺 WARRIOR: physical stronger, more hp\`
\`🧙 MAGE: magic adept, more soul\``))
      .composer;
  }

  get step_4(): Composer<BotContext> {
    return this.decision
      .action(Commands.COMMAND_NO, (ctx: BotContext) => ctx.keyboard
        .callback("🤺", Commands.COMMAND_WARRIOR)
        .callback("🧙", Commands.COMMAND_MAGE)
        .back(`\`Ok, lets try again...\`
\`Choose a class:\`
\`🤺 WARRIOR: physical stronger, more hp\`
\`🧙 MAGE: magic adept, more soul\``))
      .action(Commands.COMMAND_YES, async (ctx: BotContext) => {
        let player = await ctx.player();
        player = await player.updateName(ctx.temp(Fields.NAME));
        player = await player.changeClass(ctx.temp(Fields.CLASS));

        await ctx.reply(`\`You are a ${ctx.temp(Fields.CLASS)}\`
\`Lets start!\``);
        return await ctx.leave(Texts.player(player));
      })
      .other((ctx: BotContext) => ctx.confirm
        .reply(`\`Select a valid option!\`
\`You will be a ${ctx.temp(Fields.CLASS)}, are you sure?\``))
      .composer;
  }

  commands() {
    this.enter(Commands.COMMAND_START, Commands.SCENE_START);
  }

  scene(): WizardScene {
    return new WizardScene<BotContext>(Commands.SCENE_START,
      this.step_0,
      this.step_1,
      this.step_2,
      this.step_3,
      this.step_4
    );
  }
}

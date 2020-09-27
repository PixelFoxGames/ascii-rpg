import Debug from "debug";
import BotTelegram from "./bot.telegram";
import StartCommand from "./commands/start/start.command";

const debug = Debug("ascii-rpg:telegram:bot");

export default class Bot {
  private static readonly telegram: BotTelegram = new BotTelegram();
  private static readonly commands = {};

  async setup() {
    debug("setting up telegram Bot.telegram...");

    // const otherMenu2 = new BotMenu(async (ctx) => "ANOTHER MENU")
    //   .toggle("SUB SUB Toggle Me!", "sub_sub_toggle_1")
    //   .back();
    //
    // const otherMenu = new BotMenu(async (ctx) => "ANOTHER MENU")
    //   .toggle("SUB Toggle Me!", "sub_toggle_1")
    //   .sub("SUB SUB! YUP!", "sub_Sub", otherMenu2)
    //   .back();
    //
    // new BotMenu(async (ctx) => PlayerTexts.player(await ctx.player()))
    //   .toggle("Toggle Me!", "toggle_1")
    //   .toggle("Toggle Me 2!", "toggle_2")
    //   .sub("Other BotMenu", "other_menu", otherMenu)
    //   .middleware("/")
    //   .use(Bot.telegram, "start");

    Bot.commands["start"] = new StartCommand(Bot.telegram);

    await Bot.telegram.run();
    debug("telegram bot started");
  }
}

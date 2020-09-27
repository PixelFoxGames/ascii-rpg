import Debug from "debug";
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from "telegraf-inline-menu";
import BotContext from "./bot.context";
import BotTelegram from "./bot.telegram";

const debug = Debug("ascii-rpg:telegram:bot");

export default class BotMenu {
  private readonly template: MenuTemplate<BotContext>;
  private menuMiddleware: MenuMiddleware<BotContext>;
  private toggles = {};

  constructor(body: (ctx) => Promise<string>) {
    this.template = new MenuTemplate<BotContext>(async (ctx) => {
      return { text: await body(ctx), parse_mode: "MarkdownV2" };
    });
  }

  toggle(text: string, action: string): BotMenu {
    this.toggles[action] = false;
    this.template.toggle(text, action, {
      set: (_, newState) => {
        this.toggles[action] = newState;
        return true;
      },
      isSet: () => this.toggles[action]
    });
    return this;
  }

  back(): BotMenu {
    this.template.manualRow(createBackMainMenuButtons("↩ back", "⤴ home"));
    return this;
  }

  middleware(root: string): BotMenu {
    this.menuMiddleware = new MenuMiddleware<BotContext>(root, this.template);
    return this;
  }

  sub(text: string, action: string, menu: BotMenu): BotMenu {
    this.template.submenu(text, action, menu.template);
    return this;
  }

  use(bot: BotTelegram, command: string): BotMenu {
    debug(this.menuMiddleware.tree());
    bot.use(this.menuMiddleware.middleware());
    bot.command(command, async ctx => await this.menuMiddleware.replyToContext(ctx));
    return this;
  }
}

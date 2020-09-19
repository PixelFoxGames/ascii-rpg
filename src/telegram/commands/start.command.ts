import Command from "./command";
import UserService from "../../user/users.service";
import UserModel from "../../user/model/users.model";
import Debug from "debug";
import { TelegrafContext } from "telegraf/typings/context";

const debug = Debug("ascii-rpg:telegram:commands:start");

export default class StartCommand extends Command {
  private get _start() {
    return async (context: TelegrafContext) => {
      const user: UserModel = await UserService.getUpdate({
        user_id: context.message.from.id,
        username: `@${context.message.from.username}`,
      });
      await context.reply(`Hi ${user.username}`);
    };
  }

  setup() {
    debug("setting up telegram bot:start command...");
    this.command("start", this._start);
  }
}

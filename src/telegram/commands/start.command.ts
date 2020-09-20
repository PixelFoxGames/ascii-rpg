import Command from "./command";
import UsersService from "../../user/users.service";
import Debug from "debug";
import { TelegrafContext } from "telegraf/typings/context";
import { IUser } from "../../user/model/users.types";

const debug = Debug("ascii-rpg:telegram:commands:start");

export default class StartCommand extends Command {
  private get _start() {
    return async (context: TelegrafContext) => {
      const user: IUser = await UsersService.getUpdate({
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

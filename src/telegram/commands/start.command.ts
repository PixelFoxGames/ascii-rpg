import TelegramContext from "../telegram-context";
import Command from "./command";
import UserService from "../../user/users.service";
import UserModel from "../../user/model/users.model";

const debug = require("debug")("ascii-rpg:telegram:commands:start");

export default class StartCommand extends Command {
  private static get _start() {
    return async (context: TelegramContext) => {
      const user: UserModel = await UserService.getUpdate({
        user_id: context.id,
        username: context.username,
        first_name: context.name.first,
        last_name: context.name.last
      });
      await context.send(`Hi ${user.username}`);
    };
  }

  setup() {
    debug("setting up telegram bot:start command...");
    this.command(/\/start/, StartCommand._start);
  }
}

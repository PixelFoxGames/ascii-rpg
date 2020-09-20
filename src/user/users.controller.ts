import UsersService from "./users.service";
import Context from "../helpers/context";

export default class UsersController {
  static async getUsers(context: Context) {
    const users = await UsersService.getAll();
    context.success(users);
  }
}

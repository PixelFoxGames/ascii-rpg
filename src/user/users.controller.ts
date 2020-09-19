import UserService from "./users.service";
import Context from "../helpers/context";

export default class UsersController {
  static getUsers(context: Context) {
    UserService.findAll()
      .then(users => {
        context.success(users);
      });
  }
}

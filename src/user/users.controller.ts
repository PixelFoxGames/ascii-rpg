import UserService from "./users.service";
import Context from "../helpers/context";
import UserModel from "./model/users.model";

export default class UsersController {
  static getUsers(context: Context): Promise<UserModel[] | Error> {
    return UserService.findAll().then((users) => {
      context.success(users);
      return users;
    });
  }
}

import UserModel from "./model/users.model";
import UserSchema from "./model/users.schema";

export default class UserService {
  static async findAll(): Promise<UserModel[] | Error> {
    return await new Promise((resolve, reject) => {
      return UserSchema.find((err, users) => (err ? reject(err) : resolve(users.map((u) => UserModel.fromDocument(u)))));
    });
  }

  static async findByID(userID: number | Number): Promise<UserModel> {
    return await new Promise((resolve, reject) => {
      return UserSchema.findOne({ user_id: userID }, UserService.parseUser(reject, resolve));
    });
  }

  static async update(userModel: UserModel): Promise<UserModel> {
    return await new Promise((resolve, reject) => {
      delete userModel._id;
      delete userModel.is_deleted;
      return UserSchema.findOneAndUpdate({ user_id: userModel.user_id }, userModel, UserService.parseUser(reject, resolve));
    }).then(() => this.findByID(userModel.user_id));
  }

  static async getUpdate(userModel: UserModel): Promise<UserModel> {
    userModel = UserModel.fromDocument(userModel);
    const existing = await this.findByID(userModel.user_id);
    if (existing) {
      return await this.update(userModel);
    }

    const user: any = new UserSchema(userModel);
    await user.save();
    return await this.findByID(user.user_id);
  }

  static parseUser(reject, resolve) {
    return (err, user) => (err ? reject(err) : resolve(user ? UserModel.fromDocument(user) : null));
  }
}

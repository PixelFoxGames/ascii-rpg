import User from "./model/users.model";
import { IUser, IUserDocument } from "./model/users.types";

export default class UsersService {
  static async getAll(): Promise<IUserDocument[]> {
    return await User.find({}).populate("inventory");
  }

  static async getByUserID(userID: number): Promise<IUserDocument> {
    return await User.findOne({ user_id: userID }).populate("inventory");
  }

  static async getUpdate(user: IUser): Promise<IUserDocument> {
    const existing = await this.getByUserID(user.user_id);
    return existing ? await this.update(user) : await this.create(user);
  }

  static async update(user: IUser): Promise<IUserDocument> {
    delete user.is_deleted;
    const updated: IUserDocument = await User.findOneAndUpdate({ user_id: user.user_id }, user);
    return await this.getByUserID(updated.user_id);
  }

  static async create(user: IUser): Promise<IUserDocument> {
    return await User.create(user);
  }
}

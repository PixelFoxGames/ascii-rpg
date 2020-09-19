export default class UserModel {
  _id?: string;
  user_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_deleted?: boolean;

  static fromDocument(document: any) {
    const user = new UserModel();
    user._id = document.id || document._id;
    user.user_id = document.user_id;
    user.username = document.username;
    user.first_name = document.first_name;
    user.last_name = document.last_name;
    user.is_deleted = document.is_deleted || false;
    return user;
  }
}

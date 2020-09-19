export default class UserModel {
  _id?: String;
  user_id: Number;
  username?: String;
  first_name?: String;
  last_name?: String;
  is_deleted?: Boolean;

  static fromDocument(document: any) {
    const user = new UserModel();
    user._id = document.id || document._id;
    user.user_id = document.user_id;
    user.username = document.username;
    user.first_name = document.first_name;
    user.last_name = document.last_name;
    user.is_deleted = document.is_deleted;
    return user;
  }
}

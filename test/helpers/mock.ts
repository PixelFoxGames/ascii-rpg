import mocker from "mocker-data-generator";
import mockData from "./mock.data";
import UserService from "../../src/user/users.service";
import UserModel from "../../src/user/model/users.model";
import Debug from "debug";
import DB from "../../src/helpers/db";

const debug = Debug("ascii-rpg:test:mock");

interface IUser {
  id: number;
  _id: number;
  uuid: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  username: string;
  date: Date;
}

export default class Mock {
  private readonly data = mockData;
  private readonly db = new DB();

  get user(): IUser {
    return this.generateUsersMockData(1)[0];
  }

  nuke() {
    return this.db.nuke();
  }

  async createUsers(amount: number): Promise<UserModel[]> {
    const mockedUsers = this.generateUsersMockData(amount);
    const promises = mockedUsers.map((u) =>
      UserService.create({
        user_id: u.id,
        first_name: u.first_name,
        last_name: u.last_name,
        username: u.username,
      })
    );
    return await Promise.all(promises);
  }

  private generateUsersMockData(amount: Number): IUser[] {
    return mocker().schema("data", this.data.user, amount).buildSync().data;
  }
}

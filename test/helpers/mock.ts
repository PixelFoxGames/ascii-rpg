import mocker from "mocker-data-generator";
import mockData from "./mock.data";
import UsersService from "../../src/user/users.service";
import DB from "../../src/helpers/db";
import { IUser } from "../../src/user/model/users.types";

interface MockUser {
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

  get user(): MockUser {
    return this.generateUsersMockData(1)[0];
  }

  nuke() {
    return this.db.nuke();
  }

  async createUsers(amount: number): Promise<IUser[]> {
    const mockedUsers = this.generateUsersMockData(amount);
    const promises = mockedUsers.map((u) =>
      UsersService.create({
        user_id: u.id,
        first_name: u.first_name,
        last_name: u.last_name,
        username: u.username,
      })
    );
    return await Promise.all(promises);
  }

  private generateUsersMockData(amount: Number): MockUser[] {
    return mocker().schema("data", this.data.user, amount).buildSync().data;
  }
}

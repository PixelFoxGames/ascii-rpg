import { MockMongoose } from "mock-mongoose";
import mongoose from "mongoose";
import mocker from "mocker-data-generator";
import mockData from "./mock.data";
import UserService from "../../src/user/users.service";
import UserModel from "../../src/user/model/users.model";

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
  private readonly db = new MockMongoose(mongoose);

  get user(): IUser {
    return this.generateUsersMockData(1)[0];
  }

  init() {
    return this.db.prepareStorage().then(() => this.nuke());
  }

  nuke() {
    return this.db.helper.reset();
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

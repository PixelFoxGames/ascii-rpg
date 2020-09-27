import mocker from "mocker-data-generator";
import mockData from "./mock.data";
import PlayersService from "../../src/players/players.service";
import DB from "../../src/helpers/db";
import { PlayerDoc, PlayerProps } from "../../src/players/players.schema";

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

  async createPlayers(amount: number): Promise<PlayerDoc[]> {
    const mockedUsers = this.generateUsersMockData(amount);
    const promises = mockedUsers.map((u) =>
      PlayersService.create({
        user_id: u.id,
        first_name: u.first_name,
        last_name: u.last_name,
        username: u.username,
      } as PlayerProps),
    );
    return await Promise.all(promises);
  }

  private generateUsersMockData(amount: Number): MockUser[] {
    return mocker().schema("data", this.data.user, amount).buildSync().data;
  }
}

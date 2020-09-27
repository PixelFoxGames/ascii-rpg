import { Player, PlayerDoc, PlayerProps } from "./players.schema";

export default class PlayersService {
  static async getAll(): Promise<PlayerDoc[]> {
    return await Player.find({});
  }

  static async getByUserID(userID: number): Promise<PlayerDoc> {
    return await Player.findOne({ user_id: userID });
  }

  static async getUpdate(player: PlayerProps): Promise<PlayerDoc> {
    const existing = await this.getByUserID(player.user_id);
    return existing ? await this.update(player) : await this.create(player);
  }

  static async update(player: PlayerProps): Promise<PlayerDoc> {
    const find = await this.getByUserID(player.user_id);
    Object.keys(player).map((k) => (find[k] = player[k]));
    return await find.save();
  }

  static async create(player: PlayerProps): Promise<PlayerDoc> {
    return await new Player(player).save();
  }
}

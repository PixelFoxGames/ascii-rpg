import PlayersService from "./players.service";
import Context from "../helpers/context";

export default class PlayersController {
  static async getPlayers(ctx: Context): Promise<void> {
    const players = await PlayersService.getAll();
    ctx.success(players);
  }
}

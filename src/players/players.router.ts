import Router from "../helpers/router";
import PlayersController from "./players.controller";

export default class PlayersRouter extends Router {
  public route() {
    this.get("/api/v1/players", PlayersController.getPlayers);
  }
}

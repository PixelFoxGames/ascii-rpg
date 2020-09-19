import Router from "../helpers/router";
import UsersController from "./users.controller";

export default class UsersRouter extends Router {
  public route() {
    this.get("/api/v1/users", UsersController.getUsers);
  }
}

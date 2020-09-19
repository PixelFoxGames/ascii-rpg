import Router from "../helpers/router";
import _404Controller from "./_404.controller";

export default class _404Router extends Router {
  public route() {
    this.all("*", _404Controller.notFound);
  }
}

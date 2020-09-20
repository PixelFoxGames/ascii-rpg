import { Application } from "express";
import Context from "./context";

export default abstract class Router {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
    this.route();
  }

  public abstract route();

  all(endpoint: string, controller: (context: Context) => void) {
    this.app.all(endpoint, this._inject(controller));
  }

  get(endpoint: string, controller: (context: Context) => void) {
    this.app.get(endpoint, this._inject(controller));
  }

  private _inject(controller: (context: Context) => void) {
    return (req, res, next) => controller(new Context(req, res, next));
  }
}

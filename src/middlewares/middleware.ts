import { Application, Request, Response } from "express";

export default abstract class Middleware {
  constructor(app: Application) {
    app.use(this.middleware);
  }

  abstract middleware(request: Request, response: Response, next);
}

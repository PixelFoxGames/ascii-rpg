import { Request, Response } from "express";
import Middleware from "./middleware";
import Debug from "debug";

const debug = Debug("ascii-rpg:logger");

export default class Logger extends Middleware {
  middleware(request: Request, response: Response, next) {
    debug(`${request.method} ${request.path}`);
    next();
  }
}

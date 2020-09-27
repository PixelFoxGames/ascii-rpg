import Debug from "debug";
import { Request, Response } from "express";
import Middleware from "./middleware";

const debug = Debug("ascii-rpg:logger");

export default class Logger extends Middleware {
  middleware(request: Request, response: Response, next) {
    debug(`${request?.method} ${request?.path}`);
    next();
  }
}

import { Request, Response } from "express";
import Middleware from "./middleware";

const debug = require("debug")("ascii-rpg:logger");

export default class Logger extends Middleware {
  middleware(request: Request, response: Response, next) {
    debug(`${request.method} ${request.path}`);
    next();
  }
}

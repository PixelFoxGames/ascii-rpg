import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "./http-status";

import Debug from "debug";

const debug = Debug("ascii-rpg:helpers:context");

export default class Context {
  private readonly request: Request;
  private readonly response: Response;
  private readonly next: NextFunction;

  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request;
    this.response = response;
    this.next = next;
  }

  _respond(status, body = {}) {
    this.response.status(status).json(body);
  }

  success(body: any) {
    this._respond(HttpStatus.SUCCESS, body);
  }

  created(body: any) {
    this._respond(HttpStatus.CREATED, body);
  }

  notFound() {
    debug(`${this.request.method} ${this.request.path} 404:NOT_FOUND!`);
    this._respond(HttpStatus.NOT_FOUND, {
      errors: [
        {
          error: HttpStatus.NOT_FOUND,
          message: `${this.request.method} ${this.request.path}`,
        },
      ],
    });
  }
}

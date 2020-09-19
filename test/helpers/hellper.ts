import chai from "chai";
import chaiHttp from "chai-http";
import Mock from "./mock";
import API from "./api";

chai.use(chaiHttp);
chai.should();

export const expect = chai.expect;

export default class Hellper {
  private static readonly _mock = new Mock();
  private static readonly _api = new API();

  static get mock(): Mock {
    return this._mock;
  }

  static get api(): API {
    return this._api;
  }
}

import chai from "chai";
import chaiHttp from "chai-http";
import Mock from "./mock";

chai.use(chaiHttp);
chai.should();

export default class Hellper {
  static get mock() {
    return new Mock();
  }
}

import Hellper from "../helpers/hellper";

let ENV;
describe("DB", () => {
  beforeEach((done) => {
    ENV = Object.assign({}, process.env);
    done();
  });

  afterEach((done) => {
    process.env = Object.assign({}, ENV);
    done();
  });

  it("should not nuke", (done) => {
    process.env.NODE_ENV = "dev";
    Hellper.mock
      .nuke()
      .then(() => done("Should not nuked!"))
      .catch((err: Error) => {
        err.message.should.be.equal("Trying to nuke non TEST environment, aborting...");
        done();
      });
  });

  it("should nuke", (done) => {
    Hellper.mock
      .nuke()
      .then(() => done())
      .catch(done);
  });
});

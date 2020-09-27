import Hellper from "../../helpers/hellper";

describe("Player.Router", () => {
  beforeEach((done) => {
    Hellper.mock.nuke().then(() => done());
  });

  it("should not GET /api/v1/u, 404", (done) => {
    Hellper.api
      .get("/api/v1/u")
      .then((response) => {
        response.statusCode.should.be.equal(404);
        response.body.errors.should.be.a("array");
        response.body.errors.should.have.lengthOf(1);
        response.body.errors[0].error.should.be.equal(404);
        response.body.errors[0].message.should.be.equal("GET /api/v1/u");
      })
      .then(() => done())
      .catch(done);
  });

  it("should test GET /api/v1/players, empty", (done) => {
    Hellper.api
      .get("/api/v1/players")
      .then((response) => {
        response.statusCode.should.be.equal(200);
        response.body.should.be.a("array");
        response.body.should.have.lengthOf(0);
      })
      .then(() => done())
      .catch(done);
  });

  it("should test GET /api/v1/players, 1 player", (done) => {
    Hellper.mock
      .createPlayers(1)
      .then(() => Hellper.api.get("/api/v1/players"))
      .then((response) => {
        response.statusCode.should.be.equal(200);
        response.body.should.be.a("array");
        response.body.should.have.lengthOf(1);
        response.body[0]._id.should.not.be.null;
        response.body[0].user_id.should.not.be.null;
        response.body[0].username.should.not.be.null;
        response.body[0].first_name.should.not.be.null;
        response.body[0].last_name.should.not.be.null;
      })
      .then(() => done())
      .catch(done);
  });

  it("should test GET /api/v1/players, 10 players", (done) => {
    Hellper.mock
      .createPlayers(10)
      .then(() => Hellper.api.get("/api/v1/players"))
      .then((response) => {
        response.statusCode.should.be.equal(200);
        response.body.should.be.a("array");
        response.body.should.have.lengthOf(10);
      })
      .then(() => done())
      .catch(done);
  });
});

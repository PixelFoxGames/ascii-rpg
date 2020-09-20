import Hellper from "../../helpers/hellper";

describe("User.Router", () => {
  beforeEach((done) => {
    Hellper.mock.nuke().then(() => done());
  });

  it("should test GET /api/v1/users, empty", (done) => {
    Hellper.api
      .get("/api/v1/users")
      .then((response) => {
        response.statusCode.should.be.equal(200);
        response.body.should.be.a("array");
        response.body.should.have.lengthOf(0);
      })
      .then(() => done())
      .catch(done);
  });

  it("should test GET /api/v1/users, 1 user", (done) => {
    Hellper.mock
      .createUsers(1)
      .then(() => Hellper.api.get("/api/v1/users"))
      .then((response) => {
        response.statusCode.should.be.equal(200);
        response.body.should.be.a("array");
        response.body.should.have.lengthOf(1);
        response.body[0]._id.should.not.be.null;
        response.body[0].user_id.should.not.be.null;
        response.body[0].username.should.not.be.null;
        response.body[0].first_name.should.not.be.null;
        response.body[0].last_name.should.not.be.null;
        response.body[0].is_deleted.should.be.false;
      })
      .then(() => done())
      .catch(done);
  });

  it("should test GET /api/v1/users, 10 users", (done) => {
    Hellper.mock
      .createUsers(10)
      .then(() => Hellper.api.get("/api/v1/users"))
      .then((response) => {
        response.statusCode.should.be.equal(200);
        response.body.should.be.a("array");
        response.body.should.have.lengthOf(10);
      })
      .then(() => done())
      .catch(done);
  });
});

import Hellper, { expect } from "../../helpers/hellper";
import UserService from "../../../src/user/users.service";

describe("User.Service", () => {
  before((done) => {
    Hellper.mock.init().then(() => done());
  });

  beforeEach((done) => {
    Hellper.mock.nuke().then(() => done());
  });

  it("should findByID, empty", (done) => {
    UserService.findByID(Hellper.mock.user.id)
      .then((user) => {
        expect(user).to.be.null;
      })
      .then(() => done())
      .catch(done);
  });

  it("should findByID", (done) => {
    Hellper.mock
      .createUsers(1)
      .then((users) => UserService.findByID(users[0].user_id))
      .then((user) => {
        user._id.should.not.be.null;
        user.user_id.should.not.be.null;
        user.username.should.not.be.null;
        user.first_name.should.not.be.null;
        user.last_name.should.not.be.null;
      })
      .then(() => done())
      .catch(done);
  });

  it("should findAll, empty", (done) => {
    UserService.findAll()
      .then((users) => {
        users.should.be.a("array");
        users.should.have.lengthOf(0);
      })
      .then(() => done())
      .catch(done);
  });

  it("should findByID, 1 user", (done) => {
    Hellper.mock
      .createUsers(1)
      .then(() => UserService.findAll())
      .then((users) => {
        users.should.be.a("array");
        users.should.have.lengthOf(1);
      })
      .then(() => done())
      .catch(done);
  });

  it("should findByID, 10 users", (done) => {
    Hellper.mock
      .createUsers(10)
      .then(() => UserService.findAll())
      .then((users) => {
        users.should.be.a("array");
        users.should.have.lengthOf(10);
      })
      .then(() => done())
      .catch(done);
  });

  it("should update", (done) => {
    Hellper.mock
      .createUsers(1)
      .then((users) => {
        users[0].username = "TOTORO";
        return UserService.update(users[0]);
      })
      .then((user) => {
        user.should.be.a("object");
        user._id.should.not.be.null;
        user.user_id.should.not.be.null;
        user.username.should.be.equal("TOTORO");
        user.first_name.should.not.be.null;
        user.last_name.should.not.be.null;
      })
      .then(() => done())
      .catch(done);
  });

  it("should getUpdate, non existing", (done) => {
    UserService.getUpdate({
      user_id: 9999999,
      username: "@username",
    })
      .then((user) => {
        user.user_id.should.be.equal(9999999);
        user.username.should.be.equal("@username");
      })
      .then(() => done())
      .catch(done);
  });

  it("should getUpdate, existing", (done) => {
    Hellper.mock
      .createUsers(1)
      .then((users) => {
        return UserService.getUpdate({
          user_id: users[0].user_id,
          username: "@TOTORO",
        });
      })
      .then((user) => {
        user.should.be.a("object");
        user._id.should.not.be.null;
        user.user_id.should.not.be.null;
        user.username.should.be.equal("@TOTORO");
        user.first_name.should.not.be.null;
        user.last_name.should.not.be.null;
      })
      .then(() => done())
      .catch(done);
  });
});

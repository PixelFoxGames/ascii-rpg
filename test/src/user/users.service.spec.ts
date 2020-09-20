import Hellper, { expect } from "../../helpers/hellper";
import UsersService from "../../../src/user/users.service";
import { IUserDocument } from "../../../src/user/model/users.types";

describe("User.Service", () => {
  beforeEach((done) => {
    Hellper.mock.nuke().then(() => done());
  });

  it("should getByUserID, empty", (done) => {
    UsersService.getByUserID(Hellper.mock.user.id)
      .then((user: IUserDocument) => {
        expect(user).to.be.null;
      })
      .then(() => done())
      .catch(done);
  });

  it("should getByUserID", (done) => {
    Hellper.mock
      .createUsers(1)
      .then((users) => UsersService.getByUserID(users[0].user_id))
      .then((user: IUserDocument) => {
        user.id.should.not.be.null;
        user.user_id.should.not.be.null;
        user.username.should.not.be.null;
        user.first_name.should.not.be.null;
        user.last_name.should.not.be.null;
      })
      .then(() => done())
      .catch(done);
  });

  it("should getAll, empty", (done) => {
    UsersService.getAll()
      .then((users: IUserDocument[]) => {
        users.should.be.a("array");
        users.should.have.lengthOf(0);
      })
      .then(() => done())
      .catch(done);
  });

  it("should getByUserID, 1 user", (done) => {
    Hellper.mock
      .createUsers(1)
      .then(() => UsersService.getAll())
      .then((users: IUserDocument[]) => {
        users.should.be.a("array");
        users.should.have.lengthOf(1);
      })
      .then(() => done())
      .catch(done);
  });

  it("should getByUserID, 10 users", (done) => {
    Hellper.mock
      .createUsers(10)
      .then(() => UsersService.getAll())
      .then((users: IUserDocument[]) => {
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
        return UsersService.update(users[0]);
      })
      .then((user: IUserDocument) => {
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
    UsersService.getUpdate({
      user_id: 9999999,
      username: "@username",
    })
      .then((user: IUserDocument) => {
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
        return UsersService.getUpdate({
          user_id: users[0].user_id,
          username: "@TOTORO",
        });
      })
      .then((user: IUserDocument) => {
        user.should.be.a("object");
        user.id.should.not.be.null;
        user.user_id.should.not.be.null;
        user.username.should.be.equal("@TOTORO");
        user.first_name.should.not.be.null;
        user.last_name.should.not.be.null;
      })
      .then(() => done())
      .catch(done);
  });
});

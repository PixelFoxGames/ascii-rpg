import UserModel from "../../../src/user/model/users.model";
import Hellper from "../../helpers/hellper";

describe("User.Model", () => {
  it("should parse a User document", (done) => {
    const mockUser = Hellper.mock.user;
    const user = UserModel.fromDocument({
      id: mockUser.uuid,
      user_id: mockUser.id,
      first_name: mockUser.firstName,
      last_name: mockUser.lastName,
      username: mockUser.username,
    });

    user._id.should.to.be.equal(mockUser.uuid);
    user.user_id.should.to.be.equal(mockUser.id);
    user.first_name.should.to.be.equal(mockUser.firstName);
    user.last_name.should.to.be.equal(mockUser.lastName);
    user.username.should.to.be.equal(mockUser.username);
    user.is_deleted.should.to.be.false;

    done();
  });

  it("should parse a User document, using _id", (done) => {
    const mockUser = Hellper.mock.user;
    const user = UserModel.fromDocument({
      _id: mockUser.uuid,
      user_id: mockUser.id,
      first_name: mockUser.firstName,
      last_name: mockUser.lastName,
      username: mockUser.username,
    });

    user._id.should.to.be.equal(mockUser.uuid);
    user.user_id.should.to.be.equal(mockUser.id);
    user.first_name.should.to.be.equal(mockUser.firstName);
    user.last_name.should.to.be.equal(mockUser.lastName);
    user.username.should.to.be.equal(mockUser.username);
    user.is_deleted.should.to.be.false;

    done();
  });
});

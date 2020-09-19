import UserModel from "../../../src/user/model/users.model";
import Hellper from "../../helpers/hellper";

describe("User.Model", () => {
  it("should parse a User document", (done) => {
    const mockUser = Hellper.mock.user;
    const user = UserModel.fromDocument({
      id: mockUser.uuid,
      user_id: mockUser.id,
      first_name: mockUser.first_name,
      last_name: mockUser.last_name,
      username: mockUser.username,
    });

    user._id.should.to.be.equal(mockUser.uuid);
    user.user_id.should.to.be.equal(mockUser.id);
    user.first_name.should.to.be.equal(mockUser.first_name);
    user.last_name.should.to.be.equal(mockUser.last_name);
    user.username.should.to.be.equal(mockUser.username);
    user.is_deleted.should.to.be.false;

    done();
  });

  it("should parse a User document, using _id", (done) => {
    const mockUser = Hellper.mock.user;
    const user = UserModel.fromDocument({
      _id: mockUser.uuid,
      user_id: mockUser.id,
      first_name: mockUser.first_name,
      last_name: mockUser.last_name,
      username: mockUser.username,
    });

    user._id.should.to.be.equal(mockUser.uuid);
    user.user_id.should.to.be.equal(mockUser.id);
    user.first_name.should.to.be.equal(mockUser.first_name);
    user.last_name.should.to.be.equal(mockUser.last_name);
    user.username.should.to.be.equal(mockUser.username);
    user.is_deleted.should.to.be.false;

    done();
  });
});

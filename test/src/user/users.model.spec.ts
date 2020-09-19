import { expect } from "chai";
import UserModel from "../../../src/user/model/users.model";

describe("User.Model", () => {
  it("should parse a User document", () => {
    const user = UserModel.fromDocument({
      id: 1,
      user_id: 1,
      first_name: "Tiago",
      last_name: "L",
      username: "tihlok",
    });

    expect(user._id).to.be.equal(1);
    expect(user.user_id).to.be.equal(1);
    expect(user.first_name).to.be.equal("Tiago");
    expect(user.last_name).to.be.equal("L");
    expect(user.username).to.be.equal("tihlok");
    expect(user.is_deleted).to.be.false;
  });
});

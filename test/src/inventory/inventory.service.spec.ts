import Hellper from "../../helpers/hellper";
import UsersService from "../../../src/user/users.service";
import { IUser, IUserDocument } from "../../../src/user/model/users.types";

describe("Inventory.Service", () => {
  beforeEach((done) => {
    Hellper.mock.nuke().then(() => done());
  });

  it("should get User Inventory", (done) => {
    Hellper.mock
      .createUsers(1)
      .then((users: IUser[]) => UsersService.getByUserID(users[0].user_id))
      .then((user: IUserDocument) => {
        user.inventory.should.be.an("object");
        user.inventory.currencies.gold.should.be.equal(0);
      })
      .then(() => done())
      .catch(done);
  });

  it("should get all User Inventory", (done) => {
    Hellper.mock
      .createUsers(10)
      .then((users: IUser[]) => UsersService.getAll())
      .then((users: IUserDocument[]) => {
        users.forEach((user) => {
          user.inventory.should.be.an("object");
          user.inventory.currencies.gold.should.be.equal(0);
        });
      })
      .then(() => done())
      .catch(done);
  });

  it("should update User Inventory", (done) => {
    Hellper.mock
      .createUsers(1)
      .then((users: IUser[]) => UsersService.getByUserID(users[0].user_id))
      .then((user: IUserDocument) => {
        user.inventory.should.be.an("object");
        user.inventory.currencies.gold.should.be.equal(0);
        user.inventory.currencies.gold = 10;
        return user.save();
      })
      .then((user: IUserDocument) => {
        user.inventory.should.be.an("object");
        user.inventory.currencies.gold.should.be.equal(10);
        user.inventory.currencies.gold = 1500;
        return user.save();
      })
      .then((user: IUserDocument) => {
        user.inventory.should.be.an("object");
        user.inventory.currencies.gold.should.be.equal(1500);
      })
      .then(() => done())
      .catch(done);
  });
});

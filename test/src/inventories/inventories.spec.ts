import Hellper from "../../helpers/hellper";
import PlayersService from "../../../src/players/players.service";
import { PlayerDoc } from "../../../src/players/players.schema";

let DATE;
describe("Inventories", () => {
  before((done) => {
    DATE = Date.now;
    done();
  });

  beforeEach((done) => {
    Date.now = () => 0;
    Hellper.mock.nuke().then(() => done());
  });

  after((done) => {
    Date.now = DATE;
    done();
  });

  it("should test inventory", (done) => {
    Hellper.mock
      .createPlayers(1)
      .then((players) => PlayersService.getByUserID(players[0].user_id))
      .then((player: PlayerDoc) => {
        player.inventory.gold.current.should.be.equal(0);
        player.inventory.gold.max.should.be.equal(99000000);
        player.inventory.gold.step.should.be.equal(1);
        player.inventory.gold.last.should.be.equal(0);

        Date.now = () => 1000;
        return PlayersService.getByUserID(player.user_id);
      })
      .then((player: PlayerDoc) => {
        player.inventory.gold.current.should.be.equal(1);
        player.inventory.gold.max.should.be.equal(99000000);
        player.inventory.gold.step.should.be.equal(1);
        player.inventory.gold.last.should.be.equal(1000);

        Date.now = () => 5000;
        return PlayersService.getByUserID(player.user_id);
      })
      .then((player: PlayerDoc) => {
        player.inventory.gold.current.should.be.equal(5);
        player.inventory.gold.max.should.be.equal(99000000);
        player.inventory.gold.step.should.be.equal(1);
        player.inventory.gold.last.should.be.equal(5000);

        Date.now = () => 5999;
        return PlayersService.getByUserID(player.user_id);
      })
      .then((player: PlayerDoc) => {
        player.inventory.gold.current.should.be.equal(5);
        player.inventory.gold.max.should.be.equal(99000000);
        player.inventory.gold.step.should.be.equal(1);
        player.inventory.gold.last.should.be.equal(5000);

        Date.now = () => 6001;
        return PlayersService.getByUserID(player.user_id);
      })
      .then((player: PlayerDoc) => {
        player.inventory.gold.current.should.be.equal(6);
        player.inventory.gold.max.should.be.equal(99000000);
        player.inventory.gold.step.should.be.equal(1);
        player.inventory.gold.last.should.be.equal(6000);
      })
      .then(() => done())
      .catch(done);
  });
});

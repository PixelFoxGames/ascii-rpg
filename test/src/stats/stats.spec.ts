import Hellper, { expect } from "../../helpers/hellper";
import PlayersService from "../../../src/players/players.service";
import { PlayerDoc } from "../../../src/players/players.schema";

describe("Stats", () => {
  beforeEach((done) => {
    Hellper.mock.nuke().then(() => done());
  });

  it("should not have stats, no class yet", (done) => {
    Hellper.mock
      .createPlayers(1)
      .then((players) => PlayersService.getByUserID(players[0].user_id))
      .then((player: PlayerDoc) => {
        expect(player.stats).to.be.undefined;
      })
      .then(() => done())
      .catch(done);
  });

  it("should test stats", (done) => {
    Hellper.mock
      .createPlayers(1)
      .then((players) => PlayersService.getByUserID(players[0].user_id))
      .then((player) => player.changeClass("warrior"))
      .then((player: PlayerDoc) => {
        player.stats.level.should.be.equal(1);
        player.stats.xp.current.should.be.equal(0);
        player.stats.xp.next.should.be.equal(10);
        player.stats.hp.current.should.be.equal(16);
        player.stats.hp.max.should.be.equal(16);
        player.stats.hp.step.should.be.equal(2);
        player.stats.hp.last.should.be.lessThan(Date.now());
        player.stats.soul.current.should.be.equal(10);
        player.stats.soul.max.should.be.equal(10);
        player.stats.soul.step.should.be.equal(1);
        player.stats.soul.last.should.be.lessThan(Date.now());
      })
      .then(() => done())
      .catch(done);
  });
});

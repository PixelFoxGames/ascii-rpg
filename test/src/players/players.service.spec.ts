import Hellper, { expect } from "../../helpers/hellper";
import PlayersService from "../../../src/players/players.service";
import { PlayerDoc, PlayerProps } from "../../../src/players/players.schema";

describe("Player.Service", () => {
  beforeEach((done) => {
    Hellper.mock.nuke().then(() => done());
  });

  it("should getByPlayerID, empty", (done) => {
    PlayersService.getByUserID(Hellper.mock.user.id)
      .then((player: PlayerDoc) => {
        expect(player).to.be.null;
      })
      .then(() => done())
      .catch(done);
  });

  it("should getByPlayerID", (done) => {
    Hellper.mock
      .createPlayers(1)
      .then((players) => PlayersService.getByUserID(players[0].user_id))
      .then((player: PlayerDoc) => {
        player.id.should.not.be.null;
        player.user_id.should.not.be.null;
        player.username.should.not.be.null;
        player.first_name.should.not.be.null;
        player.last_name.should.not.be.null;
      })
      .then(() => done())
      .catch(done);
  });

  it("should getAll, empty", (done) => {
    PlayersService.getAll()
      .then((players: PlayerDoc[]) => {
        players.should.be.a("array");
        players.should.have.lengthOf(0);
      })
      .then(() => done())
      .catch(done);
  });

  it("should getByPlayerID, 1 player", (done) => {
    Hellper.mock
      .createPlayers(1)
      .then(() => PlayersService.getAll())
      .then((players: PlayerDoc[]) => {
        players.should.be.a("array");
        players.should.have.lengthOf(1);
      })
      .then(() => done())
      .catch(done);
  });

  it("should getByPlayerID, 10 players", (done) => {
    Hellper.mock
      .createPlayers(10)
      .then(() => PlayersService.getAll())
      .then((players: PlayerDoc[]) => {
        players.should.be.a("array");
        players.should.have.lengthOf(10);
      })
      .then(() => done())
      .catch(done);
  });

  it("should update", (done) => {
    Hellper.mock
      .createPlayers(1)
      .then((players) => {
        players[0].username = "TOTORO";
        return PlayersService.update(players[0]);
      })
      .then((player: PlayerDoc) => {
        player.should.be.a("object");
        player._id.should.not.be.null;
        player.user_id.should.not.be.null;
        player.username.should.be.equal("TOTORO");
        player.first_name.should.not.be.null;
        player.last_name.should.not.be.null;
      })
      .then(() => done())
      .catch(done);
  });

  it("should getUpdate, non existing", (done) => {
    PlayersService.getUpdate({
      user_id: 9999999,
      username: "@username",
    } as PlayerProps)
      .then((player: PlayerDoc) => {
        player.user_id.should.be.equal(9999999);
        player.username.should.be.equal("@username");
      })
      .then(() => done())
      .catch(done);
  });

  it("should getUpdate, existing", (done) => {
    Hellper.mock
      .createPlayers(1)
      .then((players) => {
        return PlayersService.getUpdate({
          user_id: players[0].user_id,
          username: "@TOTORO",
        } as PlayerProps);
      })
      .then((player: PlayerDoc) => {
        player.should.be.a("object");
        player.id.should.not.be.null;
        player.user_id.should.not.be.null;
        player.username.should.be.equal("@TOTORO");
        player.first_name.should.not.be.null;
        player.last_name.should.not.be.null;
      })
      .then(() => done())
      .catch(done);
  });
});

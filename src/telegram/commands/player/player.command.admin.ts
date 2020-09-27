// import Debug from "debug";
// import Command from "../command";
// import BotContext from "../../bot.context";
// import { PlayerDoc } from "../../../players/players.schema";
// import PlayerTexts from "./player.texts";
// import { Fields } from "../../../constants";
//
// const debug = Debug("ascii-rpg:telegram:commands:player");
//
// export default class PlayerCommandAdmin extends Command {
//   private get _playerGainXP() {
//     return async (context: BotContext) => {
//       const player: PlayerDoc = await context.player();
//
//       const xp = parseInt(context.match[1]);
//       player.stats.gain(Fields.XP, xp);
//       const saved = await player.save();
//
//       await context.send(PlayerTexts.playerGainXP(saved, xp));
//     };
//   }
//
//   setup() {
//     debug("setting up telegram bot:player command admin...");
//     this.hears(/!player gain xp (.\S*)/, this._playerGainXP);
//   }
// }

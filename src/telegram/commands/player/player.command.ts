// import Debug from "debug";
// import Command from "../command";
// import BotContext from "../../bot.context";
// import PlayerTexts from "./player.texts";
// import { PlayerDoc } from "../../../players/players.schema";
// import BotKeyboard from "../../buttons";
//
// const debug = Debug("ascii-rpg:telegram:commands:player");
//
// export default class PlayerCommand extends Command {
//   private get _playerClass() {
//     return async (context: BotContext) => {
//       const player: PlayerDoc = await context.player();
//
//       const _class = context.match[1]?.toLowerCase();
//       await player.changeClass(_class);
//
//       await context.send(`\`you are now a might ${_class}\``);
//     };
//   }
//
//   private get _playerClassINVALID() {
//     return async (context: BotContext) => {
//       const _class = context.match[1]?.toLowerCase();
//       await context.send(`\`class ${_class} not available, choose from: warrior, mage\``);
//     };
//   }
//
//   private get _playerClassHINT() {
//     return async (context: BotContext) => {
//       await context.send(`\`to change your class type /player class [CLASS_NAME]\`\n\`classes available: warrior, mage\``);
//     };
//   }
//
//   private get _player() {
//     return async (context: BotContext) => {
//       const player: PlayerDoc = await context.player();
//
//       const keyboard = BotKeyboard.row.callback("👾 player", "action:player").keyboard;
//       await context.edit(PlayerTexts.player(player), keyboard);
//       await context.answerCbQuery("👾");
//     };
//   }
//
//   setup() {
//     debug("setting up telegram bot:player command...");
//     this.hears(/\/player class (warrior|mage)/, this._playerClass);
//     this.hears(/\/player class (.\S*)/, this._playerClassINVALID);
//     this.hears(/\/player class/, this._playerClassHINT);
//
//     this.hears(/\/player/, this._player);
//     this.action(/action:player(.*)/, this._player);
//   }
// }

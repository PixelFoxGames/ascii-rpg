// import Debug from "debug";
// import Command from "../command";
// import BotContext from "../../bot.context";
//
// const debug = Debug("ascii-rpg:telegram:commands:player");
//
// export default class FightCommand extends Command {
//   private get _fight() {
//     return async (context: BotContext) => {
//       // const player: PlayerDoc = await context.player();
//       // await context.edit(`searching a fight`);
//       await context.answerCbQuery("wait");
//     };
//   }
//
//   setup() {
//     debug("setting up telegram bot:fight command...");
//     this.action(/action:fight(.*)/, this._fight);
//   }
// }

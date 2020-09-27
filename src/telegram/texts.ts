import { PlayerDoc } from "../players/players.schema";
import Environment from "../helpers/environment";

export default class Texts {
  static player(player: PlayerDoc) {
    return `${player?.username}     \`.${Environment.ENV}\`

${this.level(player)}${this.class(player)}
${this.xp(player)}
${this.gold(player)}

${this.hp(player)}
${this.soul(player)}
`;
  }

  static level(player: PlayerDoc) {
    return `${player.stats?.level?.right(12)}\` : 👾 \``;
  }

  static xp(player: PlayerDoc) {
    return `${player.stats?.xp?.current?.right(12)}\` : 🎲 xp    \``; // ${player.stats.xp.bar("🟨")}
  }

  static hp(player: PlayerDoc) {
    return `${player.stats?.hp?.current?.right(12)}\` : 🩸 hp    \``; // ${player.stats.hp.bar("🟩")}
  }

  static soul(player: PlayerDoc) {
    return `${player.stats?.soul?.current?.right(12)}\` : 👻 soul  \``; // ${player.stats.soul.bar("🟦")}
  }

  static class(player: PlayerDoc) {
    return `\`${player.class?.name}\``;
  }

  static gold(player: PlayerDoc) {
    return `${player.inventory?.gold?.current?.right(12)}\` : 💰 gold\``;
  }
}

import Context from "../helpers/context";

export default class _404Controller {
  static notFound(ctx: Context) {
    ctx.notFound();
  }
}

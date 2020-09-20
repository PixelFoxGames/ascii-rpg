import { config } from "dotenv";

export default class Environment {
  static get ENV(): string {
    return process.env.NODE_ENV || "dev";
  }

  static get isTEST(): boolean {
    return this.ENV.includes("test");
  }

  static get FORCE_NUKE(): boolean {
    return !!process.env.FORCE_NUKE;
  }

  static get PORT(): number {
    return parseInt(process.env.PORT) || 9000;
  }

  static get DB_URI(): string {
    return process.env.DB_URI;
  }

  static get TELEGRAM_API_TOKEN(): string {
    return process.env.TELEGRAM_API_TOKEN;
  }
}

config({ path: `.env.${Environment.ENV}` });

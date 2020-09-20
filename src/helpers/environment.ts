import { config } from "dotenv";

config();
config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env" });

export default class Environment {
  static get isTEST(): boolean {
    return process.env.NODE_ENV.includes("test");
  }

  static get FORCE_NUKE(): boolean {
    return !!process.env.FORCE_NUKE;
  }

  static get PORT(): number {
    return parseInt(process.env.PORT) || 9000;
  }

  static get DB_URI(): string {
    return this.isTEST ? `${process.env.DB_URI}_test` : process.env.DB_URI;
  }

  static get TELEGRAM_API_TOKEN(): string {
    return process.env.TELEGRAM_API_TOKEN;
  }
}

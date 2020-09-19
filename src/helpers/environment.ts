import { config } from "dotenv";

config();

class Environment {
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

export default Environment;

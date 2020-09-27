import App from "./app";
import Debug from "debug";

const debug = Debug("ascii-rpg:server");

const app: App = new App();
app.start().then((port) => {
  debug(`SERVER: http://localhost:${port}`);
});

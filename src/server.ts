import App from "./app";

const debug = require("debug")("ascii-rpg:server");

const app = new App();
app.start()
  .then((port) => {
    debug(`SERVER: http://localhost:${port}`);
  });

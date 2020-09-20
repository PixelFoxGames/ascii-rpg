import App from "../../src/app";
import chai from "chai";
import Debug from "debug";

const debug = Debug("ascii-rpg:test:api");

export default class API {
  private static readonly application: App = new App();
  private static _started: boolean = false;

  get(url: string) {
    return this._request("get", url);
  }

  private _request(method: string, url: string): Promise<any> {
    if (!API._started) {
      return API.application.start().then(() => {
        API._started = true;
        return this._request(method, url);
      });
    }

    const request = chai.request(API.application.app)[method](url);
    return new Promise((resolve, reject) => {
      return request.end((err, res) => (err ? reject(err) : resolve(res)));
    });
  }
}

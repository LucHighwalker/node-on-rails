import * as path from "path";
import * as rmdir from "rimraf";
import ncp from "ncp";

export default class Initializer {
  name: string;
  boilerPath: string;
  tempPath: string;
  directory: string;

  constructor(name: string, directory: string, isJS: boolean) {
    this.name = name;
    this.boilerPath = path.join(
      __dirname,
      isJS ? "../../boiler/" : "../boiler"
    );
    this.tempPath = path.join(__dirname, isJS ? "../../_temp/" : "../_temp");
    this.directory = directory;

    // rmdir.default(this.tempPath, (err) => {
    //   if (err) throw err;
    // });
  }

  async initialize() {
    try {
      await this.createBase();
    } catch (err) {
      throw err;
    }
  }

  async createBase() {
    return new Promise((resolve, reject) => {
      ncp(`${this.boilerPath}config`, this.tempPath, (err: Error[]) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

import * as path from "path";
import * as rmdir from "rimraf";
import ncp from "ncp";

import { writeFile, ensureDirExists } from "./helpers";

import server from "../boiler/templates/src/server";
import serverDef from "../boiler/templates/defaults/src/server";
import index from "../boiler/templates/src/index";

export default class Initializer {
  name: string;
  boilerPath: string;
  templatesPath: string;
  tempPath: string;
  directory: string;

  isJS: boolean;

  constructor(name: string, directory: string, isJS: boolean) {
    this.name = name;
    this.boilerPath = path.join(
      __dirname,
      isJS ? "../../boiler/" : "../boiler"
    );
    this.tempPath = path.join(__dirname, isJS ? "../../_temp/" : "../_temp");
    this.directory = directory;

    rmdir.default(this.tempPath, err => {
      if (err) throw err;
    });
  }

  async initialize() {
    try {
      await this.createBase();
      await this.addServer();
    } catch (err) {
      throw err;
    }
  }

  createBase(): Promise<void> {
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

  addServer(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      ensureDirExists(path.join(this.tempPath, "src"));
      await writeFile(
        path.join(this.tempPath, "src/server.ts"),
        server(serverDef.middleware, "")
      );
      await writeFile(`${this.tempPath}/src/index.ts`, index());
    });
  }
}

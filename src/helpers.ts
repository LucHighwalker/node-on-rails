import * as fs from "fs";

import * as sys from "sys";
const { exec, spawn } = sys;

export const parseJson = (json: {}) => JSON.parse(JSON.stringify(json));

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const upperCase = (s: string) => s.toUpperCase();

export const dirExists = filePath => fs.existsSync(filePath);

export const ensureDirExists = filePath => {
  if (fs.existsSync(filePath) === false) {
    fs.mkdirSync(filePath);
  }
};

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) reject(err);
      resolve();
    });
  });

export const shell = (command, log = false, cb = null) =>
  new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) reject(err);
      if (cb) cb(stdout);
      if (log) process.stdout.write(`\n${stdout}\n\n`);
      resolve({
        stdout,
        stderr
      });
    });
  });

export const npmInstall = (
  path: string,
  silent: boolean,
  cb: Function = null
) =>
  new Promise(async (resolve, reject) => {
    if (silent) {
      try {
        // loading.startLoading();
        await shell(`npm install --prefix ${path}`, true, () => {
          // loading.stopLoading();
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    } else {
      const install = spawn("npm", [
        "install",
        "--loglevel=info",
        "--no-spin",
        "--prefix",
        path
      ]);

      install.stdout.on("data", data => process.stdout.write(data));

      install.stderr.on("data", data => process.stderr.write(data));

      install.on("exit", () => {
        if (cb) cb();
        resolve();
      });
    }
  });

export default {
  parseJson,
  capitalize,
  upperCase,
  dirExists,
  ensureDirExists,
  writeFile,
  shell,
  npmInstall
};

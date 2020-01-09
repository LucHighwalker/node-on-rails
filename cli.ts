#!/usr/bin/env node

import pkg from "./package.json";

import Initializer from "./src/initializer";

import * as path from "path";

const [, , ...args] = process.argv;

const main = async () => {
  const isJS = path.basename(__filename)[4] == 'j';
  try {
    const command = args[0] ? args[0] : "-h";

    switch (command) {
      case "-v":
      case "--version":
        process.stdout.write(`Node On Rails version: ${pkg.version}\n`);
        break;

      case "-h":
      case "--help":
        // log help message
        break;

      case "-n":
      case "--new":
        const destination = process.cwd();
        const initializer = new Initializer("test", destination, isJS);
        await initializer.initialize();
        break;

      default:
        if (command[0] === "-") {
          throw new Error(
            `Invalid command [${command}]. Use 'partum --help' for a list of commands.`
          );
        }
    }
  } catch (error) {
    process.stdout.write(error);
  }
};

try {
  main();
} catch (error) {
  throw error;
}

#!/usr/bin/env node

import pkg from './package.json';

const [, , ...args] = process.argv;

const main = async () => {
  try {
    const command = args[0] ? args[0] : '-h';

    switch (command) {
      case '-v':
      case '--version':
        process.stdout.write(`Node On Rails version: ${pkg.version}\n`);
        break;

      case '-h':
      case '--help':
        // log help message
        break;

      case '-n':
      case '--new':
        const destination = process.cwd();
        
        break;

      default:
        if (command[0] === '-') {
          throw new Error(
            `Invalid command [${command}]. Use 'partum --help' for a list of commands.`,
          );
        }
    }
  } catch (error) {
    process.stdout.write(error);
  }
}

main();

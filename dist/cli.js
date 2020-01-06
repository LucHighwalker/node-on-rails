#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("./package.json"));
const [, , ...args] = process.argv;
// const Generator = require('./src/generator');
// const HelpMsg = require('./src/helpMsg');
// const Initializer = require('./src/initializer');
// const Options = require('./src/options');
const main = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const command = args[0] ? args[0] : '-h';
        switch (command) {
            case '-v':
            case '--version':
                process.stdout.write(`Node On Rails version: ${package_json_1.default.version}\n`);
                break;
            case '-h':
            case '--help':
                // log help message
                break;
            case '-i':
            case '--init':
                const destination = process.cwd();
                const destArr = destination.split('/'); // eslint-disable-line
                const name = destArr[destArr.length - 1];
                break;
            default:
                if (command[0] === '-') {
                    throw new Error(`Invalid command [${command}]. Use 'partum --help' for a list of commands.`);
                }
        }
    }
    catch (error) {
        process.stdout.write(error);
    }
});
main();

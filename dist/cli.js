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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("./package.json"));
const initializer_1 = __importDefault(require("./src/initializer"));
const path = __importStar(require("path"));
const [, , ...args] = process.argv;
const main = () => __awaiter(this, void 0, void 0, function* () {
    const isJS = path.basename(__filename)[4] == 'j';
    try {
        const command = args[0] ? args[0] : "-h";
        switch (command) {
            case "-v":
            case "--version":
                process.stdout.write(`Node On Rails version: ${package_json_1.default.version}\n`);
                break;
            case "-h":
            case "--help":
                // log help message
                break;
            case "-n":
            case "--new":
                const destination = process.cwd();
                const initializer = new initializer_1.default("test", destination, isJS);
                yield initializer.initialize();
                break;
            default:
                if (command[0] === "-") {
                    throw new Error(`Invalid command [${command}]. Use 'partum --help' for a list of commands.`);
                }
        }
    }
    catch (error) {
        process.stdout.write(error);
    }
});
try {
    main();
}
catch (error) {
    throw error;
}

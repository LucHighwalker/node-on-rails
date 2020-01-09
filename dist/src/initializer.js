"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const ncp_1 = __importDefault(require("ncp"));
class Initializer {
    constructor(name, directory, isJS) {
        this.name = name;
        this.boilerPath = path.join(__dirname, isJS ? "../../boiler/" : "../boiler");
        this.tempPath = path.join(__dirname, isJS ? "../../_temp/" : "../_temp");
        this.directory = directory;
        // rmdir.default(this.tempPath, (err) => {
        //   if (err) throw err;
        // });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.createBase();
            }
            catch (err) {
                throw err;
            }
        });
    }
    createBase() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                ncp_1.default(`${this.boilerPath}config`, this.tempPath, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
}
exports.default = Initializer;

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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const sys = __importStar(require("sys"));
const { exec, spawn } = sys;
exports.parseJson = (json) => JSON.parse(JSON.stringify(json));
exports.capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
exports.upperCase = (s) => s.toUpperCase();
exports.dirExists = filePath => fs.existsSync(filePath);
exports.ensureDirExists = filePath => {
    if (fs.existsSync(filePath) === false) {
        fs.mkdirSync(filePath);
    }
};
exports.writeFile = (path, data) => new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
        if (err)
            reject(err);
        resolve();
    });
});
exports.shell = (command, log = false, cb = null) => new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
        if (err)
            reject(err);
        if (cb)
            cb(stdout);
        if (log)
            process.stdout.write(`\n${stdout}\n\n`);
        resolve({
            stdout,
            stderr
        });
    });
});
exports.npmInstall = (path, silent, cb = null) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
    if (silent) {
        try {
            // loading.startLoading();
            yield exports.shell(`npm install --prefix ${path}`, true, () => {
                // loading.stopLoading();
            });
            resolve();
        }
        catch (err) {
            reject(err);
        }
    }
    else {
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
            if (cb)
                cb();
            resolve();
        });
    }
}));
exports.default = {
    parseJson: exports.parseJson,
    capitalize: exports.capitalize,
    upperCase: exports.upperCase,
    dirExists: exports.dirExists,
    ensureDirExists: exports.ensureDirExists,
    writeFile: exports.writeFile,
    shell: exports.shell,
    npmInstall: exports.npmInstall
};

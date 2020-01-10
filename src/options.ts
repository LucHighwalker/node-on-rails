import * as path from "path";
import * as fs from "fs";

class Options extends Object {
  name: string;

  constructor(name: string, load: boolean = false) {
    super();

    this.name = name;

    if (load) this.loadOptions();
  }

  loadOptions() {
    const optionsPath = path.join(process.cwd(), "nrails.json");
    const options = JSON.parse(JSON.stringify(require(optionsPath)));

    this.assignValues(options);
  }

  assignValues(values: {}) {
    const keys = Object.keys(values);
    for (let i = 0; i < keys.length; i += 1) {
      this[keys[i]] = values[keys[i]];
    }
  }

  save() {
    const currentDir = process.cwd();
    const currDirArr = currentDir.split("/");
    const currDirName = currDirArr[currDirArr.length - 1];
    const filePath =
      this.name === currDirName ? currentDir : `${currentDir}/${this.name}`;
    const copy = Object.assign({}, this);

    // helper.ensureDirExists(filePath);
    fs.writeFile(
      `${filePath}/nrails.json`,
      JSON.stringify(copy, null, 2),
      err => {
        if (err) throw err;
      }
    );
  }
}

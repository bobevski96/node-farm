import {readFile,writeFile} from "node:fs/promises";



export class DataService {
    // 1. Read json file FOR JSON
    static async readJSONFile(path) {
      const stringData = await readFile(path, { encoding: "utf-8" });
  
      return stringData;
    }
  
    // 2. Save json file FROR JSON
    static async writeJSONFile(path, data) {

      return writeFile(path, JSON.stringify(data, 0, 2));
    }
}




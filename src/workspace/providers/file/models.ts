import { readFile } from "fs/promises";
import * as path from 'path';
import { globAsync } from "../../../common/glob";
import { extractModelType } from "../../../common/regex";
 
export async function getWorkspaceModels(basePath: string = process.cwd()) {
  const models = {};

  const modelFilePaths = await globAsync(path.join(basePath, './models/**/*.yaml'));
  const fileLoadPromises = await Promise.all(modelFilePaths.map(async (modelPath) => {
    const type = modelPath.match(extractModelType)[1];
    const fileBuffer = await readFile(modelPath);
    let model;
    try {
      model = JSON.parse(fileBuffer.toString());
    } catch (e) {
      throw new Error(`Problem parsing model JSON: ${JSON.stringify(e)}`);
    }
    
    if(models[type]) {
      models[type].push(model);
    } else {
      models[type] = [ model ];
    }
  }));

  return models;
}


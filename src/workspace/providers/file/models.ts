import { readFile, writeFile } from "fs/promises";
import * as path from 'path';
import { globAsync } from "../../../common/glob";
import { extractModelType } from "../../../common/regex";
import { parse, stringify } from 'yaml';
import { Model } from "../../../types";

export async function getModels(basePath: string = process.cwd(), schemas?) {
  const models = new Map();
  const cwd = process.cwd();

  const modelFilePaths = await globAsync(path.join(basePath, './models/**/*.yaml'));
  const fileLoadPromises = await Promise.all(modelFilePaths.map(async (modelPath) => {
    const type = (modelPath.replace(cwd, '').match(extractModelType) || [])[1] + '.schema.json';
    const {validate: schemaValidator} = schemas[type];
    if (schemaValidator) {
      const fileBuffer = await readFile(modelPath);
      let model;
      try {
        model = parse(fileBuffer.toString());
        schemaValidator(model);
        model.path = modelPath;
        model.type = type;
      } catch (e) {
        console.error(`Problem parsing model JSON for: ${modelPath}`)
        throw e;
      }
      models.set(modelPath, model);
    } else {
      throw new Error(`No schema definition for model type ${type}`);
    }

  }));
  await Promise.all(fileLoadPromises);
  return models;
}

export async function saveModelUpdate(model: Model, schemas): Promise<void> {
  const modelCopy = structuredClone(model);
  const path = modelCopy.path as string;
  const type = modelCopy.type as string;
  const { validate: schemaValidator } = schemas[type];
  delete modelCopy.path;
  delete modelCopy.type;
  try {
    schemaValidator(modelCopy);
  } catch (e) {
    throw new Error(`Error validating model prior to saving to disk: ${JSON.stringify(e)}`);
  }
  try {
    writeFile(path, stringify(modelCopy));
  } catch(e) {
    throw new Error(`Error writing updated model to disk: ${JSON.stringify(e)}`);
  }
}

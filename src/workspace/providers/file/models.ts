import { readFile } from "fs/promises";
import * as path from 'path';
import { globAsync } from "../../../common/glob";
import { extractModelType } from "../../../common/regex";
import { parse } from 'yaml';
import { nameToId } from '../../../common/nameToId';

import { Model } from "../../../types";

export async function getModels(basePath: string = process.cwd(), schemas?) {
  const models = new Map();
  const cwd = process.cwd();

  const modelFilePaths = await globAsync(path.join(basePath, './models/**/*.yaml'));
  const fileLoadPromises = await Promise.all(modelFilePaths.map(async (modelPath) => {
    const type = (modelPath.replace(cwd, '').match(extractModelType) || [])[1];
    const schemaValidator = schemas[type];
    if (schemaValidator) {
      const fileBuffer = await readFile(modelPath);
      let model;
      try {
        model = parse(fileBuffer.toString());
        schemaValidator(model)
        model.path = modelPath;
      } catch (e) {
        throw new Error(`Problem parsing model JSON: ${JSON.stringify(e)}`);
      }
      models.set(modelPath, model);
    } else {
      throw new Error(`No schema definition for model type ${type}`);
    }

  }));
  await Promise.all(fileLoadPromises);
  return models;
}


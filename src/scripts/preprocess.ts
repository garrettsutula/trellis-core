import * as YAML from 'yaml';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import { defaultPassthroughScript } from '../types';


async function parseSchema(modelPathOrObject: string | $RefParser.JSONSchema): Promise<$RefParser.JSONSchema> {
  let model;
  try {
    model = await $RefParser.parse(modelPathOrObject);
  } catch(err) {
    throw err;
  }
  return model;
}

export async function preprocessModel(modelPathOrObject: string | $RefParser.JSONSchema, preprocessingFn = defaultPassthroughScript): Promise<string> {
  let schema = await parseSchema(modelPathOrObject);
  try {
    schema = await preprocessingFn(schema);
  } catch (err) {
    throw err;
  }
  return YAML.stringify(schema);
}

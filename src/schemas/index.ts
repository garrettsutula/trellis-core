import Ajv, { Schema, JSONSchemaType } from "ajv";
import addFormats from "ajv-formats"
const ajv = new Ajv();
addFormats(ajv);

export function addSchema(schema) {
  const { $id } = schema;
  const existingSchema = ajv.getSchema($id);
  if (existingSchema) ajv.removeSchema($id);
  return ajv.addSchema(schema);
}

export function getSchemaValidator(schema: JSONSchemaType<any>) {
  let validator;
  try {
    validator = ajv.compile(schema);
  } catch (e) {
    console.error(e);
    throw new Error(`Couldn't create validator from schema: ${JSON.stringify(schema)}`);
  }
  return validator;
}
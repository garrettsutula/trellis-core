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

export function getRefsInSchema(schema, path = '#', refs = [], key?) {
  const { type, format } = schema;
  if (type === 'string' && format === 'uri-reference') {
    refs.push(`${path}${key ? '/' + key: ''}`);
  }
  if (type === 'array') {
    const { items } = schema;
    getRefsInSchema(items, `${path}${key ? '/' + key + "/*": ''}`, refs);
  } else if (type === 'object') {
    const { properties, patternProperties } = schema;
    if (properties) {
      Object.keys(properties).forEach((propertyKey) => {
        const property = properties[propertyKey];
        getRefsInSchema(property, `${path}${key ? '/' + key: ''}`, refs, propertyKey);
      });
    }
    if (patternProperties) {
      const props = Object.values(patternProperties);
      if (props.length !== 1) throw new Error("Pattern properties have more than one pattern, not supported.")
      else
        getRefsInSchema(props[0], `${path}/*`, refs);
    }
  }
  return refs;
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
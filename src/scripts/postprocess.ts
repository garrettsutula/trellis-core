import $RefParser from '@apidevtools/json-schema-ref-parser';
import { defaultPassthroughScript } from '../types';

async function dereferenceSchema(modelPathOrObject): Promise<$RefParser.JSONSchema> {
  let model;
  try {
    model = await $RefParser.dereference(modelPathOrObject);
  } catch (err) {
    throw err;
  }
  return model;
}

export async function postprocessModel(modelPathOrObject: string | $RefParser.JSONSchema, postprocessFn = defaultPassthroughScript) {
  if (postprocessFn) {
    try {
      const model = await dereferenceSchema(modelPathOrObject);
      const processedSchema = postprocessFn(model);
      return processedSchema;
    } catch(err) {
      throw err;
    }
    
  }
  
  // FIXME
  // Ugly hack for now. 
  // Explanation: This library does what we want and does it well but we are not always using it to parse JSON schema documents.
  // the 'workspace' module is intended to replace this functionality and provide backend-specific implementations of these modules.
  return dereferenceSchema(modelPathOrObject) as any;
};

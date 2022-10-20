import * as jp from 'jsonpath-faster';
import * as path from 'path';
import * as pointer from 'json-pointer';

function dereference(ref: string, currentModel, models) {
  // Current model
  let file, path;
  const [filePath, jsonPointer] = ref.split('#');
  const model = models.get(filePath);
  if(jsonPointer) {
    const value = pointer.get(model, `#${jsonPointer}`);
    if (!value) throw new Error(`Json Pointer: ${ref} didn't resolve in model ${path.basename(filePath)}`);
    return value;
  }
  return model;
}

export function dereferenceModel(model: any, models) {
  const derefCache = new Map();
  const modelDir = path.dirname(model.path);
  const nodes = jp.apply(model, '$..[?(@.ref)]', ({ ref }) => {
    const fullRefPath = ref.startsWith('#') ? `${model.path}${ref}` : path.join(modelDir, ref);
    let refValue = derefCache.get(fullRefPath);
    if (refValue) return refValue;
    refValue = dereference(fullRefPath, model, models);
    derefCache.set(fullRefPath, refValue);
    return refValue;
  });
  console.log(nodes);
  return model;
}

export function rereferenceModel(model) {
  return model;
}
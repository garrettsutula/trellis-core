import * as jp from 'jsonpath-faster';
import * as path from 'path';
import * as pointer from 'json-pointer';
import { Model, Models } from '../../../types';

function dereferenceProperty(ref: string, models) {
  // Current model
  let path;
  const [filePath, jsonPointer] = ref.split('#');
  const referencedModel = models.get(filePath);
  if(jsonPointer) {
    const value = pointer.get(referencedModel, `${jsonPointer}`);
    if (!value) throw new Error(`Json Pointer: ${ref} didn't resolve in model ${path.basename(filePath)}`);
    return value;
  }
  return referencedModel;
}

export function dereferenceModels(allModels: Models): Model[] {
  const derefCache = new Map();
  return Array.from(allModels.entries()).map(([modelPath, model]) => {
    const modelCopy: any = structuredClone(model);
    const modelDir = path.dirname(modelPath);
    const matchedPaths = jp.paths(modelCopy, '$..[?(@.ref)]');
    matchedPaths.forEach((matchedPath) => {
      jp.apply(modelCopy, matchedPath.join('.'), ({ ref }) => {
        const fullRefPath = ref.startsWith('#') ? `${modelPath}${ref}` : path.join(modelDir, ref);
        let refValue = derefCache.get(fullRefPath);
        if (refValue) return refValue;
        refValue = dereferenceProperty(fullRefPath, allModels);
        derefCache.set(fullRefPath, refValue);
        return refValue;
      });
    })
    return modelCopy;
  });
}

export function rereferenceModel(model) {
  return model;
}
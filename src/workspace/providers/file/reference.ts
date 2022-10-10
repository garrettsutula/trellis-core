import * as jp from 'jsonpath-faster';

function dereference(ref: string, currentModel, models) {
  // Current model
  let file, path;
  const refFragments = ref.split('#');
  if (refFragments.length === 1) path = refFragments[0];
  else if (refFragments.length === 2 ) {
    file = refFragments[0];
    path = refFragments[1];
  } else {
    throw new Error(`Unexpected number of reference fragments: ${refFragments.length}\n${JSON.stringify(refFragments)}`);
  }
  
  if (ref.startsWith('#')) {

  } else if (ref.startsWith('./')) {

  }
}

export function dereferenceModel(model: any, models) {
  const derefCache = new Map();
  const nodes = jp.apply(model, '$..[?(@.ref)]', ({ ref }) => {
    let refValue = derefCache.get(ref);
    if (refValue) return refValue;
    refValue = dereference(ref, model, models);
    derefCache.set(ref, refValue);
    return refValue;
  });
  console.log(nodes);
  return model;
}

export function rereferenceModel(model) {
  return model;
}
export function nameToId(name) {
  if (name) {
    return name.replace(/_{2}|_|\*|\(|\)/g, '').replace(/\n| |-|_|\.|:{2}|_{3}|,/g, '') 
  } else {
    throw new Error(`Model name is falsy: ${name}`);
  }
};

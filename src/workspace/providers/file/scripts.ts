import path from "path";

import { globAsync } from "../../../common/glob";
import { scriptType } from "../../../common/regex";

export async function getScripts(basePath: string = process.cwd()) {
  const cwd = process.cwd();
  const scriptPaths = {};

  const preprocessingScriptPaths = await globAsync(path.join(cwd, basePath, './scripts/*.js'));
  const preprocessingScripts = await Promise.all(preprocessingScriptPaths.map(async (scriptPath) => {
    const scripts = await import(scriptPath);
    return {
      preprocessFn: scripts.preprocessFn,
      postprocessFn: scripts.postprocessFn,
    }
  }))
  preprocessingScriptPaths.forEach((scriptPath, i) => {
    const type = scriptPath.match(scriptType)[1] + '.schema.json';
    scriptPaths[type] = preprocessingScripts[i];
  });
  return scriptPaths;
}

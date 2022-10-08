import path from "path";

import { globAsync } from "../../../common/glob";
import { scriptType } from "../../../common/regex";

export async function getScripts(basePath: string = process.cwd()) {
  const scriptPaths = {};
  const cwd = process.cwd();

  const preprocessingScriptPaths = await globAsync(path.join(basePath, './scripts/*.js'));
  const preprocessingScripts = await Promise.all(preprocessingScriptPaths.map(async (scriptPath) => {
    const scripts = await import(`${scriptPath}`);
    return {
      preprocessFn: scripts.preprocessFn,
      postprocessFn: scripts.postprocessFn,
    }
  }))
  preprocessingScriptPaths.forEach((scriptPath, i) => {
    const type = scriptPath.match(scriptType)[1];
    scriptPaths[type] = preprocessingScripts[i];
  });
  return scriptPaths;
}
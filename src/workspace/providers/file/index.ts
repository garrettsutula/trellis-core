import { Workspace } from "../../../types";
import { getModels } from './models';
import { getTemplates } from "./templates";
import { getSchemas } from "./schemas";
import { getScripts } from "./scripts";
import { dereferenceModels } from "./reference";


// TODO: Use node APIs, try for bun compat for free perf.
export function provider (baseFilePath: string) {
  const workspaceBasePath = baseFilePath;
  return {
    readWorkspace: async (opts?): Promise<Workspace> => {
      const [schemas, templates, scripts ] = await Promise.all([
        getSchemas(workspaceBasePath),
        getTemplates(workspaceBasePath),
        getScripts(workspaceBasePath),
      ]);

      const models = await getModels(workspaceBasePath, schemas);
      
      return {
        models,
        schemas,
        templates,
        scripts,
      };
    },
    // TODO: figure out params
    saveWorkspaceChange: (workspace, opts) => {
    
    },
    dereferenceModels,
  }
}

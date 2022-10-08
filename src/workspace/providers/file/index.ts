import { Workspace } from "../../../types";
import { getModels } from './models';
import { getTemplates } from "./templates";
import { getSchemas } from "./schemas";
import { getScripts } from "./scripts";

// TODO: Use node APIs, try for bun compat for free perf.
export function provider (baseFilePath: string) {
  const workspaceBasePath = baseFilePath;
  return {
    readWorkspace: async (opts): Promise<Workspace> => {
      const schemas = await getSchemas(workspaceBasePath);
      const scripts = await getScripts(workspaceBasePath);

      const [models, templates ] = await Promise.all([
        getModels(workspaceBasePath, schemas),
        getTemplates(workspaceBasePath),
      ]
      )
      
      return Promise.resolve({
        models,
        schemas: {},
        templates,
        scripts: {},
      });
    },
    // TODO: figure out params
    saveWorkspaceChange: (workspace, opts) => {
    
    }
  }
}

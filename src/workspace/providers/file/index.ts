import { Workspace, WorkspaceChange } from "../../../types";
import { getModels, saveModelUpdate } from './models';
import { getTemplates } from "./templates";
import { getSchemas } from "./schemas";
import { getScripts } from "./scripts";
import { dereferenceModels } from "./reference";


// TODO: Use node APIs, try for bun compat for free perf.
// TODO: Remember what this means
export function provider (baseFilePath: string) {
  let workspace;
  const workspaceBasePath = baseFilePath;
  return {
    readWorkspace: async (opts?): Promise<Workspace> => {
      const [schemas, templates, scripts ] = await Promise.all([
        getSchemas(workspaceBasePath),
        getTemplates(workspaceBasePath),
        getScripts(workspaceBasePath),
      ]);

      const models = await getModels(workspaceBasePath, schemas);
      workspace = {
        models,
        schemas,
        templates,
        scripts,
      };
      return workspace;
    },

    saveWorkspaceChange: async (workspaceChange: WorkspaceChange, opts?): Promise<Workspace> => {
      if(workspaceChange.workspaceItemPath.includes('models')) {
        await saveModelUpdate(workspaceChange.workspaceItem, workspace.schemas);
        workspace.models.set(workspaceChange.workspaceItemPath, workspaceChange.workspaceItem)
      }
      return workspace;
    },
    dereferenceModels,
  }
}

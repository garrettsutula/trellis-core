import { Workspace } from "../../../types";

// TODO: Use node APIs, try for bun compat for free perf.
export function provider (baseFilePath: string) {
  const workspaceBasePath = baseFilePath;
  return {
    readWorkspace: (opts): Promise<Workspace> => {
      
      return Promise.resolve({
        models: {},
        schemas: {},
        templates: {},
        scripts: {},
      });
    },
    // TODO: figure out params
    saveWorkspaceChange: (workspace, opts) => {
    
    }
  }
}

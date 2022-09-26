//TODO: base off fetch api for node/browser cross-compat.
export function provider (workspaceId?: string) {
  let currentWorkspace;
  if (workspaceId) null;// TODO: Load current workspace from API
  else null;// TODO: create a new workspace

  return {
    readWorkspace: (opts) => {

    },
    // TODO: figure out params
    saveWorkspaceChange: (workspace, opts) => {
    
    }
  }
}
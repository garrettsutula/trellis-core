// TODO: Use node APIs, try for bun compat for free perf.
export function provider (baseFilePath: string) {
  const workspaceBasePath = baseFilePath;
  return {
    readWorkspace: (opts) => {

    },
    // TODO: figure out params
    saveWorkspaceChange: (workspace, opts) => {
    
    }
  }
}

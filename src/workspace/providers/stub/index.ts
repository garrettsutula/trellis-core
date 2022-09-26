import { WorkspaceContext } from "../../types";
import { compileTemplate } from "../../../templates";

export function provider() {
  let currentWorkspace = {
    models: {
      System: {
        testSystem: {
          name: 'Test System',
          components: {
            ui: {
              name: 'Mobile App',
              type: 'UI',
              dependencies: [{ $ref: "#/System/testSystem/components/service" }],
            },
            service: {
              name: 'REST API',
              type: 'service',
              dependencies: [ { $ref: "#/System/testSystem/components/db" } ],
            },
            db: {
              name: 'SQL Database',
              type: 'Database',
              dependencies: [],
            },
          },
        },
        newSystem: {
          name: 'New System',
          components: {
            newUi: {
              name: 'New Mobile App',
              type: 'UI',
              dependencies: [
                { $ref: "#/System/testSystem/components/service" }
              ]
            }
          }
        }
      },
    },
    schemas: {}, // can skip for now
    templates: {
      System: [
        {
          modelType: 'System',
          fileType: 'txt',
          template: compileTemplate('{{name}}'),
        }
      ]
    },
    scripts: {},
  }

  return {
    readWorkspace: (opts): WorkspaceContext => {
      return currentWorkspace;
    },
    // TODO: figure out params
    saveWorkspaceChange: (workspace, opts) => {
      // Object.keys(workspace.models)
      // Maybe do a json diff of models & persist that snapshot?
      // Figure out the right time to update a model and clean up diffs?
    }
  }
}
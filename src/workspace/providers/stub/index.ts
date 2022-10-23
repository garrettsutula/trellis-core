import { Workspace } from "../../../types";

const systemModels = new Map();
systemModels.set('./testSystem.yaml', {
  name: 'Test System',
  type: 'System',
  path: './testSystem.yaml',
  components: {
    ui: {
      id: 'testSystem.ui',
      name: 'Mobile App',
      type: 'UI',
      dependencies: [{ $ref: "#/System/testSystem/components/service" }],
    },
    service: {
      id: 'testSystem.service',
      name: 'REST API',
      type: 'service',
      dependencies: [ { $ref: "#/System/testSystem/components/db" } ],
    },
    db: {
      name: 'SQL Database',
      id: 'testSystem.db',
      type: 'Database',
      dependencies: [],
    },
  },
});
systemModels.set('./newSystem.yaml', {
  name: 'New System',
  type: 'System',
  path: './newSystem.yaml',
  components: {
    newUi: {
      name: 'New Mobile App',
      id: 'newSystem.newUi',
      type: 'UI',
      dependencies: [
        { $ref: "#/System/testSystem/components/service" }
      ]
    }
  }
});

export function provider() {
  let currentWorkspace = {
    models: systemModels,
    schemas: {}, // can skip for now
    templates: {
      System: [
        {
          modelType: 'System',
          fileType: 'txt',
          template: '{{name}}',
        }
      ]
    },
    scripts: {},
  }

  return {
    readWorkspace: (opts): Workspace => {
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
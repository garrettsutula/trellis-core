import $RefParser from "@apidevtools/json-schema-ref-parser";

export const defaultPassthroughScript = (model: $RefParser.JSONSchema) => model;

export type PartialTemplate = {
  name: string;
  template: string;
}

export type GenericObject = { [key: string]: unknown};
export type ModelElement = GenericObject & {id: number, name: string, description: string, dependencies: string[]};
export type Model = { [key: string]: unknown};
export type Models = Map<string, Model>;
export type ParsedSchema = { validate: any, refs: string[] };
export type OutputTemplate = {
  modelType: string,
  fileType: string,
  template: string,
};

export type Workspace = {
  models: Models, // Parsed objects prior to de-referencing, edited in ui/ide
  schemas: { [key: string]: ParsedSchema }, // Parsed maybe ajv objects?, used to parse, validate models
  templates: { [key: string]: OutputTemplate[]},
  scripts: { [key: string]: any }, // Loaded, used to pre and post-process models
};

export type WorkspaceProvider = {
  readWorkspace: (opts: GenericObject) => Workspace;
  saveWorkspaceChange: (workspace: Workspace, opts: GenericObject) => any;
  dereferenceModels: (models: Models) => Model[];
}
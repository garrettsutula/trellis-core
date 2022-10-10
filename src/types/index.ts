import $RefParser from "@apidevtools/json-schema-ref-parser";

export const defaultPassthroughScript = (model: $RefParser.JSONSchema) => model;

export type PartialTemplate = {
  name: string;
  template: string;
}

export type GenericObject = { [key: string]: unknown};
export type ModelElement = GenericObject & {id: number, name: string, description: string, dependencies: string[]};
export type Model = { [key: string]: unknown};
export type OutputTemplate = {
  modelType: string,
  fileType: string,
  template: string,
};

export type Workspace = {
  models: { [key: string]: Map<string, Model> }, // Parsed objects prior to de-referencing, edited in ui/ide
  schemas: { [key: string]: string }, // Parsed maybe ajv objects?, used to parse, validate models
  templates: { [key: string]: OutputTemplate[]},
  scripts: { [key: string]: any }, // Loaded, used to pre and post-process models
};
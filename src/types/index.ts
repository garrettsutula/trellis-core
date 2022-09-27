import $RefParser from "@apidevtools/json-schema-ref-parser";

export const defaultPassthroughScript = (model: $RefParser.JSONSchema) => model;

export type WorkspaceContext = {
  models: { [key: string]: { [key: string]: any}}, // Parsed objects prior to de-referencing, edited in ui/ide
  schemas: { [key: string]: string }, // Parsed maybe ajv objects?, used to parse, validate models
  templates: { [key: string]: {
    modelType: string,
    fileType: string,
    template: string,
  }[]},
  scripts: { [key: string]: any }, // Loaded, used to pre and post-process models
};

export type PartialTemplate = {
  name: string;
  template: string;
}
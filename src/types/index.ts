import $RefParser from "@apidevtools/json-schema-ref-parser";

export const defaultPassthroughScript = (model: $RefParser.JSONSchema) => model;

export type PartialTemplate = {
  name: string;
  template: string;
}
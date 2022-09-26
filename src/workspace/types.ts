export type WorkspaceContext = {
  models: { [key: string]: { [key: string]: any}}, // Parsed objects prior to de-referencing, edited in ui/ide
  schemas: { [key: string]: string }, // Parsed maybe ajv objects?, used to parse, validate models
  templates: { [key: string]: {
    modelType: string,
    fileType: string,
    template: Handlebars.Template,
  }[]},
  scripts: { [key: string]: any }, // Loaded, used to pre and post-process models
};
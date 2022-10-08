import { globAsync } from "../../../common/glob";
import { extractTemplateType } from "../../../common/regex";
import { compileTemplate } from "../../../templates";
import { readFile } from "fs/promises";
import path from "path";

export async function getTemplates(basePath = process.cwd()) {
  const cwd = process.cwd();
  const templates = {};
  const templatePaths = await globAsync(path.join(basePath, './templates/**(!partials)/*.hbs'));
  const loadedTemplates = await Promise.all(templatePaths.map(async (templatePath) => {
    const {groups: {modelType, fileName, fileType} = {}} = templatePath.replace(cwd, '').match(extractTemplateType);
    return {
      modelType,
      fileType,
      fileName,
      template: compileTemplate((await readFile(templatePath)).toString()),
    }
  }));
  loadedTemplates.forEach((template) => {
    const { modelType } = template;
    if (!templates[modelType]) templates[modelType] = [];
    templates[modelType].push(template);
  });
  return templates;
}
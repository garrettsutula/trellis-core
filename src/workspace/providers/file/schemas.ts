import { globAsync } from "../../../common/glob";
import { schemaType } from "../../../common/regex";
import path from "path";
import { getSchemaValidator, addSchema } from "../../../schemas";
import { readFileJson } from "../../../common/readFiles";


export async function getSchemas(basePath = process.cwd()) {
  const cwd = process.cwd();
  const schemas: {[key: string]: any} = {};
  const schemaFilePaths = await globAsync(path.join(basePath, './schemas/**/*.json'));
  await Promise.all(schemaFilePaths.map(async (schemaPath) => {
      try {
        const type = schemaPath.replace(cwd, '').match(schemaType)[1];
        const schema = await readFileJson(schemaPath);
        addSchema(schema);
        schemas[type] = schema;
      } catch (err) {
        throw err;
      }
    }));
    Object.keys(schemas)
      .forEach((schemaKey) => {
        schemas[schemaKey] = getSchemaValidator(schemas[schemaKey]);
      });
    return schemas;
}
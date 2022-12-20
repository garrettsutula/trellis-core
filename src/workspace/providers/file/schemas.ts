import { globAsync } from "../../../common/glob";
import { schemaType } from "../../../common/regex";
import path from "path";
import { getSchemaValidator, addSchema, getRefsInSchema } from "../../../schemas";
import { readFileJson } from "../../../common/readFiles";


export async function getSchemas(basePath = process.cwd()) {
  const cwd = process.cwd();
  const schemas: {[key: string]: any} = {};
  const schemaFilePaths = await globAsync(path.join(basePath, './schemas/**/*.json'));
  await Promise.all(schemaFilePaths.map(async (schemaPath) => {
      try {
        const schema = await readFileJson(schemaPath);
        const id = schema.$id;
        addSchema(schema);
        schemas[id] = schema;
      } catch (err) {
        throw err;
      }
    }));
    Object.keys(schemas)
      .forEach((id) => {
        schemas[id] = 
        {
          validate: getSchemaValidator(schemas[id]),
          refs: getRefsInSchema(schemas[id]),
          schema: schemas[id],
        };
      });
    return schemas;
}
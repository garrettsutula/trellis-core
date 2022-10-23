import path from 'node:path';
import test from 'node:test';
import { strict as assert } from 'node:assert';

import { getRefsInSchema } from '.';
import { getSchemas } from '../workspace/providers/file/schemas';



test('load workspace from filesystem', async (t) => { 
  const schemas = await getSchemas(path.join(process.cwd(),'./testWorkspace'));
  const refs = Object.values(schemas).map(({validate: { schema }}) => getRefsInSchema(schema));
  console.log(refs);
});
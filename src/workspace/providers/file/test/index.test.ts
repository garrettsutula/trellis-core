import path from 'node:path';
import test from 'node:test';
import { strict as assert } from 'node:assert';

import { getScripts } from '../scripts';
import { getSchemas } from '../schemas';
import { getModels } from '../models';
import { getTemplates } from '../templates';

test('load workspace from filesystem', async (t) => {

  Promise.all([
    t.test('load scripts from filesystem', async (t) => {
      const scripts = await getScripts(path.join(process.cwd(),'./test/testWorkspace'));
      assert.ok(scripts);
    }),
    t.test('load schemas from filesystem', async (t) => {
      const schemas = await getSchemas(path.join(process.cwd(),'./test/testWorkspace'));
      assert.ok(schemas);
    }),
    await t.test('load templates from filesystem', async (t) => {
      const templates = await getTemplates(path.join(process.cwd(),'./test/testWorkspace'));
      assert.ok(templates);
    }),
  ]);

  await t.test('load models from filesystem', async (t) => {
    const schemas = await getSchemas(path.join(process.cwd(),'./test/testWorkspace'));
    const models = await getModels(path.join(process.cwd(),'./test/testWorkspace'), schemas);
    assert.ok(models);
  });

});
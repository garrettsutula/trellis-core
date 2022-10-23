import path from 'node:path';
import test from 'node:test';
import { strict as assert } from 'node:assert';

import { getScripts } from '../scripts';
import { getSchemas } from '../schemas';
import { getModels } from '../models';
import { getTemplates } from '../templates';
import { dereferenceModels, rereferenceModel } from '../reference';
import { provider } from '../';

test('load workspace from filesystem', async (t) => {

  Promise.all([
    t.test('load workspace', async () => {
      const workspaceProvider = provider('./testWorkspace');
      const workspace = await workspaceProvider.readWorkspace({});
      assert.ok(workspace);
    }),
    t.test('load scripts from filesystem', async (t) => {
      const scripts = await getScripts(path.join(process.cwd(),'./testWorkspace'));
      assert.ok(scripts);
    }),
    t.test('load schemas from filesystem', async (t) => {
      const schemas = await getSchemas(path.join(process.cwd(),'./testWorkspace'));
      assert.ok(schemas);
    }),
    await t.test('load templates from filesystem', async (t) => {
      const templates = await getTemplates(path.join(process.cwd(),'./testWorkspace'));
      assert.ok(templates);
    }),
  ]);

  const schemas = await getSchemas(path.join(process.cwd(),'./testWorkspace'));
  const models = await getModels(path.join(process.cwd(),'./testWorkspace'), schemas);

  await t.test('load models from filesystem', async (t) => {
    assert.ok(models);
  });

  await t.test('dereference model', (t) => {
    const deref = dereferenceModels(models);
  });

});
import path from 'node:path';
import test from 'node:test';
import { strict as assert } from 'node:assert';

import { registerPartials, compileTemplate } from '.';

const cwd = process.cwd();
const testPartials = [{name: 'TestPartial', template: 'test partial template'}];
const testTemplate = 'test template {{name}}';
const testObject = {name: 'testObject', testReference: {$ref: path.join(cwd, './testWorkspace/models/Solution/testSolution.yaml')}};

test('load workspace from filesystem', async (t) => {

  await Promise.all([
    t.test('init and register partial', () => {
      registerPartials(testPartials);
    }),
    t.test('re-register partial', () => {
      registerPartials(testPartials);
    }),
    t.test('compileTemplate', async () => {
      const template = compileTemplate(testTemplate);
      const output = template(testObject);
      assert.ok(output.includes(testObject.name));
    })
  ]);
});

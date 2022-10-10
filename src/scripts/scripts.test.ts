import path from 'node:path';
import test from 'node:test';
import { strict as assert } from 'node:assert';

import { preprocessModel, postprocessModel } from '.';

const cwd = process.cwd();
const testObject = {name: 'testObject', testReference: {$ref: path.join(cwd, './testWorkspace/models/Solution/testSolution.yaml')}};
const testPreprocessFn = (newName) => { return (model) => { model.name = newName; return model; }};
const testPostprocessFn = (newName) => { return (model) => { model.testReference.name = newName; return model; }}
/*
test('model processing scripts', async (t) => {
  const preprocessingTests = 
    [
      t.test('load from file', async () => {
        const model = await preprocessModel(path.join(cwd, './testWorkspace/models/System/testSystem.yaml'));
        assert.ok(model);
      }),
      t.test('load from object', async () => {
        const model = await preprocessModel(testObject);
        assert.ok(model);
      }),
      t.test('function that changes the model', async () => {
        const newName = 'changed for test';
        const model = await preprocessModel(path.join(cwd, './testWorkspace/models/Solution/testSolution.yaml'), testPreprocessFn(newName));
        assert.ok(model.includes(newName));
      }),
    ];
  const postprocessingTests = [
    await t.test('load from file', async () => {
      const model = await postprocessModel(path.join(cwd, './testWorkspace/models/Solution/testSolution.yaml'));
      assert.ok(model);
    }),
    await t.test('load from object', async () => {
      const model = await postprocessModel(testObject);
      assert.ok(model.testReference.name);
    }),
    await t.test('function that changes the model', async () => {
      const newName = 'changed for test';
      const model = await postprocessModel(path.join(cwd, './testWorkspace/models/Solution/testSolution.yaml'), testPostprocessFn(newName));
      assert.equal(model.testReference.name, newName);
    }),
  ]
  await Promise.all([...preprocessingTests, ...postprocessingTests]);
});
*/
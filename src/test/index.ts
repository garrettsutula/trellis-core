import path from 'node:path';
import test from 'node:test';
import { strict as assert } from 'node:assert';

import {preprocessModel, postprocessModel, registerPartials, compileTemplate, getWorkspaceProvider} from '..';

import { getWorkspaceModels } from '../workspace/providers/file/models';

const cwd = process.cwd();
const testObject = {name: 'testObject', testReference: {$ref: path.join(cwd, './test/testReference.yaml')}};
const testPreprocessFn = (newName) => { return (model) => { model.name = newName; return model; }};
const testPostprocessFn = (newName) => { return (model) => { model.testReference.name = newName; return model; }}

async function runTests() {
  test('preprocessModel', async (t) => {
    const tests = [
      await t.test('load from file', async () => {
        const model = await preprocessModel(path.join(cwd, './test/testModel.yaml'));
        assert.ok(model);
      }),
      await t.test('load from object', async () => {
        const testObject = {name: 'testObject', testReference: {$ref: path.join(cwd, './test/testReference.yaml')}};
        const model = await preprocessModel(testObject);
        assert.ok(model);
      }),
      await t.test('function that changes the model', async () => {
        const newName = 'changed for test';
        const model = await preprocessModel(path.join(cwd, './test/testModel.yaml'), testPreprocessFn(newName));
        assert.ok(model.includes(newName));
      }),
    ]
  
    await Promise.all(tests);
  });
  
  test('postprocessModel', async (t) => {
    const tests = [
      await t.test('load from file', async () => {
        const model = await postprocessModel(path.join(cwd, './test/testModel.yaml'));
        assert.ok(model);
      }),
      await t.test('load from object', async () => {
        const model = await postprocessModel(testObject);
        assert.ok(model.testReference.name);
      }),
      await t.test('function that changes the model', async () => {
        const newName = 'changed for test';
        const model = await postprocessModel(path.join(cwd, './test/testModel.yaml'), testPostprocessFn(newName));
        assert.equal(model.testReference.name, newName);
      }),
    ]
  
    await Promise.all(tests);
  });
  
  const testPartials = [{name: 'TestPartial', template: 'test partial template'}];
  
  await test('registerPartials', async(t) => {
    // Sequential execution desired here, we are specifically testing re-registering after initialization.
      await t.test('init and register partial', () => {
        registerPartials(testPartials);
      });
  
      await t.test('re-register partial', () => {
        registerPartials(testPartials);
      });
  })
  
  const testTemplate = 'test template {{name}}';
  
  await test('compileTemplate', async () => {
    const template = compileTemplate(testTemplate);
    const output = template(testObject);
    assert.ok(output.includes(testObject.name));
  });
  
  await test('loadProject', async(t) => {
    const workspaceProvider = await getWorkspaceProvider('stub');
    const workspace = await workspaceProvider.readWorkspace({});
    assert.ok(workspace.models);
  })
  
  await test('workspace', async (t) => {
    await t.test('load models from filesystem', async (t) => {
      const models = await getWorkspaceModels(path.join(process.cwd(),'./test/testWorkspace'));
      assert.ok(models);
    })
  });
}

runTests().then().catch();
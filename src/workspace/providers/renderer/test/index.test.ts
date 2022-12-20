import test from 'node:test';
import { strict as assert } from 'node:assert';
import { getRenderer, encodeMarkup } from '..';

const testMarkup = '@startuml\nBob -> Alice : hello\n@enduml';
const testMarkupEncoded = 'SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vt98pKi1IW80';

test('encode markup', async (t) => {
  const encodedMarkup = await encodeMarkup(testMarkup);
  assert.equal(encodedMarkup, testMarkupEncoded);
});

test('render plantuml diagram as svg', async (t) => {
  const renderer = getRenderer('http://192.168.0.181:8080');
  const svg = await renderer.getSvg(testMarkup);
  console.log(svg);5
});
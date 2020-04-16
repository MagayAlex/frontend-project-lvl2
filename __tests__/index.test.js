import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const arr = ['json', 'yaml', 'ini'];
test.each(arr)('test %%%', (etxtention) => {
  const fileBefore = getFixturePath(`beforeTree.${etxtention}`);
  const fileAfter = getFixturePath(`afterTree.${etxtention}`);
  expect(genDiff(fileBefore, fileAfter, 'tree')).toEqual(readFile('resultTree.txt'));
  expect(genDiff(fileBefore, fileAfter, 'plain')).toEqual(readFile('resultPlain.txt'));
  expect(genDiff(fileBefore, fileAfter, 'json')).toEqual(readFile('resultJson.txt'));
});

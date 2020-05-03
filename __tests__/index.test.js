import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
let resultTree;
let resultPlain;
let resultJson;
beforeAll(() => {
  resultTree = readFile('resultTree.txt');
  resultPlain = readFile('resultPlain.txt');
  resultJson = readFile('resultJson.txt');
});
test.each(['json', 'yaml', 'ini'])('test %%%', (format) => {
  const fileBefore = getFixturePath(`beforeTree.${format}`);
  const fileAfter = getFixturePath(`afterTree.${format}`);
  expect(genDiff(fileBefore, fileAfter, 'tree')).toEqual(resultTree);
  expect(genDiff(fileBefore, fileAfter, 'plain')).toEqual(resultPlain);
  expect(genDiff(fileBefore, fileAfter, 'json')).toEqual(resultJson);
});

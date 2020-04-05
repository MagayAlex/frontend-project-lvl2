import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const arr = [['beforeTree.json', 'afterTree.json', 'tree', 'resultTree.txt'], ['before.json', 'after.json', 'tree', 'result.txt'],
  ['before.yaml', 'after.yaml', 'tree', 'result.txt'], ['beforeTree.yaml', 'afterTree.yaml', 'tree', 'resultTree.txt'],
  ['before.ini', 'after.ini', 'tree', 'result.txt'], ['beforeTree.ini', 'afterTree.ini', 'tree', 'resultTree.txt'],
  ['beforeTree.json', 'afterTree.json', 'plain', 'resultPlain.txt'], ['before.json', 'after.json', 'plain', 'resultPlainSimple.txt'],
  ['beforeTree.json', 'afterTree.json', 'json', 'resultJson.txt']];

test.each(arr)('test %#', (a, b, type, result) => {
  const file1 = getFixturePath(a);
  const file2 = getFixturePath(b);
  const expected = readFile(result);
  expect(genDiff(file1, file2, type)).toEqual(expected);
});

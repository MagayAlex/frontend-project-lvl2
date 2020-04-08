import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const arr = [['beforeTree.json', 'afterTree.json', 'tree', 'resultTree.txt'], ['beforeTree.yaml', 'afterTree.yaml', 'tree', 'resultTree.txt'],
  ['beforeTree.ini', 'afterTree.ini', 'tree', 'resultTree.txt'], ['beforeTree.json', 'afterTree.json', 'plain', 'resultPlain.txt'],
  ['beforeTree.yaml', 'afterTree.yaml', 'plain', 'resultPlain.txt'], ['beforeTree.ini', 'afterTree.ini', 'plain', 'resultPlain.txt'],
  ['beforeTree.json', 'afterTree.json', 'json', 'resultJson.txt'], ['beforeTree.yaml', 'afterTree.yaml', 'tree', 'resultTree.txt'],
  ['beforeTree.ini', 'afterTree.ini', 'json', 'resultJson.txt']];

test.each(arr)('test %#', (a, b, type, result) => {
  const file1 = getFixturePath(a);
  const file2 = getFixturePath(b);
  const expected = readFile(result);
  expect(genDiff(file1, file2, type)).toEqual(expected);
});

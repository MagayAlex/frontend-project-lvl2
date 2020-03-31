import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const arr = [['beforeTree.json', 'afterTree.json', 'resultTree.txt'], ['before.json', 'after.json', 'result.txt'], ['before.yaml', 'after.yaml', 'result.txt'], ['beforeTree.yaml', 'afterTree.yaml', 'resultTree.txt'],
  ['before.ini', 'after.ini', 'result.txt'], ['beforeTree.ini', 'afterTree.ini', 'resultTree.txt']];

test.each(arr)('test %#', (a, b, result) => {
  const file1 = getFixturePath(a);
  const file2 = getFixturePath(b);
  const expected = readFile(result);
  expect(genDiff(file1, file2)).toEqual(expected);
});

import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const arr = [['before.json', 'after.json', 'result.txt'], ['before.yaml', 'after.yaml', 'result.txt'], ['1.yaml', '2.yaml', '3.txt'], ['before.ini', 'after.ini', 'result.txt']];

test.each(arr)('test %#', (a, b, result) => {
  const file1 = getFixturePath(a);
  const file2 = getFixturePath(b);
  const expected = readFile(result);
  expect(genDiff(file1, file2)).toEqual(expected);
});

import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const arr = [['tree', 'resultTree.txt'], ['plain', 'resultPlain.txt'], ['json', 'resultJson.txt']];

const arrOfExtentions = ['.json', '.yaml', '.ini'];
test.each(arr)('test %#', (type, result) => {
  arrOfExtentions.forEach((etxtention) => {
    const before = `beforeTree${etxtention}`;
    const after = `afterTree${etxtention}`;
    const file1 = getFixturePath(before);
    const file2 = getFixturePath(after);
    const expected = readFile(result);
    expect(genDiff(file1, file2, type)).toEqual(expected);
  });
});

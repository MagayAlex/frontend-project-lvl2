import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const arr = [['tree', 'resultTree.txt'], ['plain', 'resultPlain.txt'], ['json', 'resultJson.txt']];
const arrOfData = [['beforeTree.json', 'afterTree.json'], ['beforeTree.ini', 'afterTree.ini'], ['beforeTree.yaml', 'afterTree.yaml']];
test.each(arr)('test %#', (type, result) => {
  console.log(`test ${type} files`);
  arrOfData.forEach((element) => {
    const [before, after] = element;
    const file1 = getFixturePath(before);
    const file2 = getFixturePath(after);
    const expected = readFile(result);
    expect(genDiff(file1, file2, type)).toEqual(expected);
  });
});

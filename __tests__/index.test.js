import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

test('test #1', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const file1 = getFixturePath('before.json');
  const file2 = getFixturePath('after.json');
  // const pathResult = getFixturePath('result.txt');
  // const resultData = fs.readFileSync(resultPath);


  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  const temp = readFile('result.txt');
  // console.log('temp= ', temp);
  const result = temp;// JSON.parse(temp);
  console.log('result = ', result);
  // const file2 = readFile('after.json');
  expect(genDiff(file1, file2)).toEqual(result);
});
// ' \n   host: hexlet.io \n + timeout: 20 \n - timeout: 50 \n - proxy: 123.234.53.22 \n - follow: false \n + verbose: true'

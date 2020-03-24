import lodash from 'lodash';
import fs from 'fs';
import path from 'path';

const { has } = lodash;

const genDiff = (pathToFile1, pathToFile2) => {
  const file1Path = path.resolve(process.cwd(), pathToFile1);
  const file2Path = path.resolve(process.cwd(), pathToFile2);
  const data1 = fs.readFileSync(file1Path);
  const data2 = fs.readFileSync(file2Path);
  if (path.extname(pathToFile1) !== '.json' || path.extname(pathToFile2) !== '.json') {
    return console.log('Error: this type of files doesnt support');
  }
  const parsedJSON1 = JSON.parse(data1);
  const parsedJSON2 = JSON.parse(data2);
  const reducer = (acc, n) => {
    const [key, value] = n;
    if (has(parsedJSON2, key) && parsedJSON2[key] !== value) {
      acc = `${acc} \n + ${key}: ${parsedJSON2[key]} \n - ${key}: ${value}`;
    }
    if (has(parsedJSON2, key) && parsedJSON2[key] === value) {
      acc = `${acc} \n   ${key}: ${value}`;
    }
    if (!has(parsedJSON2, key)) {
      acc = `${acc} \n - ${key}: ${value}`;
    }
    return acc;
  };
  const jsonArray = Object.entries(parsedJSON1);
  const json2keys = Object.keys(parsedJSON2);
  const json1keys = Object.keys(parsedJSON1);
  const temp = jsonArray.reduce(reducer, '');
  const result = json2keys.reduce((acc, key) => {
    if (!json1keys.includes(key)) {
      acc = `${acc} \n + ${key}: ${parsedJSON2[key]}`;
    }
    return acc;
  }, temp);
  console.log('result= ', result);
  return result;
};

export default genDiff;

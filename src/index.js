import lodash from 'lodash';
import parser from './parsers.js';

const { has } = lodash;

const genDiff = (pathToFile1, pathToFile2) => {
  const parsedFile1 = parser(pathToFile1);
  const parsedFile2 = parser(pathToFile2);
  const reducer = (acc, n) => {
    const [key, value] = n;
    const temp = [];
    if (has(parsedFile2, key) && parsedFile2[key] !== value) {
      temp.push(`  + ${key}: ${parsedFile2[key]}\n  - ${key}: ${value}`);
    }
    if (has(parsedFile2, key) && parsedFile2[key] === value) {
      temp.push(`    ${key}: ${value}`);
    }
    if (!has(parsedFile2, key)) {
      temp.push(`  - ${key}: ${value}`);
    }
    return [...acc, temp];
    // return acc;
  };
  const jsonArray = Object.entries(parsedFile1);
  const json2keys = Object.keys(parsedFile2);
  const json1keys = Object.keys(parsedFile1);
  const temp = jsonArray.reduce(reducer, '');
  const result = json2keys.reduce((acc, key) => {
    if (!json1keys.includes(key)) {
      return [...acc, `  + ${key}: ${parsedFile2[key]}`];
    }
    return acc;
  }, temp);
  const x = result.join('\n');
  return `{\n${x}\n}`;
};

export default genDiff;

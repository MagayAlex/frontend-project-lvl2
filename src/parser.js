import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';
import lodash from 'lodash';

const {
  has, uniq,
} = lodash;

const parser = (file) => {
  const filePath = path.resolve(process.cwd(), file);
  const data = fs.readFileSync(filePath, 'utf8');
  switch (path.extname(file)) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error(`Unknown file type: '${file}'!`);
  }
};
const getAst = (data1, data2) => {
  const uniqueKeys = uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();
  const result = uniqueKeys.reduce((acc, key) => {
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return [...acc, { atr: 'unchanged', key, children: getAst(data1[key], data2[key]) }];
    }
    if (data1[key] === data2[key]) {
      return [...acc, { atr: 'unchanged', key, value: data1[key] }];
    }
    if (has(data1, key) && !has(data2, key)) {
      return [...acc, { atr: 'deleted', key, value: data1[key] }]; // buildObj(key, data1[key], 'deleted', [])];
    }
    if (!has(data1, key) && has(data2, key)) {
      return [...acc, { atr: 'added', key, value: data2[key] }]; // buildObj(key, data2[key], 'added', [])];
    }
    return [...acc, {
      atr: 'changed', key, newValue: data2[key], oldValue: data1[key],
    }];
  }, []);
  return result;
};
export { getAst, parser };

import yaml from 'js-yaml';
import ini from 'ini';

const toNumber = (value) => {
  if (!Number.isNaN(parseFloat(value))) {
    return parseFloat(value);
  }
  return value;
};
const numberifyValues = (obj) => {
  const entries = Object.entries(obj);
  return entries.reduce((acc, [key, value]) => {
    if (value instanceof Object) {
      return { ...acc, [key]: numberifyValues(value) };
    }
    return { ...acc, [key]: toNumber(value) };
  }, {});
};
const parsers = {
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.load(data),
  ini: (data) => numberifyValues(ini.parse(data)),
};
export default (data, type) => {
  if (!parsers[type]) {
    throw new Error(`Unknown file type: '${type}'!`);
  }
  return parsers[type](data);
};

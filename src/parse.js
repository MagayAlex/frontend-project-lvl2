import yaml from 'js-yaml';
import ini from 'ini';

const toNumber = (value) => {
  const floatNumber = parseFloat(value);
  return Number.isNaN(floatNumber) ? value : floatNumber;
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
  json: JSON.parse,
  yaml: yaml.load,
  ini: (data) => numberifyValues(ini.parse(data)),
};
export default (data, type) => {
  const parse = parsers[type];
  if (!parse) {
    throw new Error(`Unknown file type: '${type}'!`);
  }
  return parse(data);
};

import yaml from 'js-yaml';
import ini from 'ini';

const toNumber = (n) => {
  if (!Number.isNaN(parseFloat(n))) {
    return parseFloat(n);
  }
  return n;
};
const iniFixNumbers = (obj) => {
  const entries = Object.entries(obj);
  return entries.reduce((acc, [key, value]) => {
    if (value instanceof Object) {
      return { ...acc, [key]: iniFixNumbers(value) };
    }
    return { ...acc, [key]: toNumber(value) };
  }, {});
};

export default (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'ini':
      return iniFixNumbers(ini.parse(data));
    default:
      throw new Error(`Unknown file type: '${type}'!`);
  }
};

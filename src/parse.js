import yaml from 'js-yaml';
import ini from 'ini';

const isNumber = (n) => {
  if (!Number.isNaN(parseFloat(n)) && !Number.isNaN(n - 0)) {
    return parseInt(n, 10);
  }
  return n;
};
const iniFix = (obj) => {
  const entries = Object.entries(obj);
  return entries.reduce((acc, [key, value]) => {
    if (value instanceof Object) {
      return { ...acc, [key]: iniFix(value) };
    }
    return { ...acc, [key]: isNumber(value) };
  }, {});
};

export default (data, extName) => {
  switch (extName) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.ini':
      console.log('ini', iniFix(ini.parse(data)));
      console.log('ini Before', ini.parse(data));
      return iniFix(ini.parse(data));
    default:
      throw new Error(`Unknown file type: '${extName}'!`);
  }
};

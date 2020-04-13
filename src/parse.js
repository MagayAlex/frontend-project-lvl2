import yaml from 'js-yaml';
import ini from 'ini';

export default (data, extName) => {
  switch (extName) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error(`Unknown file type: '${extName}'!`);
  }
};

import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';

export default (file) => {
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

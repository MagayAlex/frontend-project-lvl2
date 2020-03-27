import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';

export default (file) => {
  const filePath = path.resolve(process.cwd(), file);
  const data = fs.readFileSync(filePath, 'utf8');
  if (path.extname(file) === '.json') {
    return JSON.parse(data);
  }
  if (path.extname(file) === '.yaml') {
    return yaml.load(data);
  }
  if (path.extname(file) === '.ini') {
    return ini.parse(data);
  }
  return 'Error: wrong file extension';
};

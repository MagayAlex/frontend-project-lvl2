import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import buildAst from './buildAst.js';
import format from './format';

const data = (pathToFile) => fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
const genDiff = (pathToFile1, pathToFile2, type = 'json') => {
  const parsedFile1 = parse(data(pathToFile1), path.extname(pathToFile1));
  const parsedFile2 = parse(data(pathToFile2), path.extname(pathToFile2));
  const astTree = buildAst(parsedFile1, parsedFile2);
  return format(astTree, type);
};
export default genDiff;

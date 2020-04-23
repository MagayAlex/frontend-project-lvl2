import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import buildAst from './buildAst.js';
import format from './format';

const readFile = (pathToFile) => fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
const getData = (pathToFile) => parse(readFile(pathToFile), path.extname(pathToFile).slice(1));
const genDiff = (pathToFile1, pathToFile2, type = 'json') => {
  const parsedFile1 = getData(pathToFile1);
  const parsedFile2 = getData(pathToFile2);
  const astTree = buildAst(parsedFile1, parsedFile2);
  return format(astTree, type);
};
export default genDiff;

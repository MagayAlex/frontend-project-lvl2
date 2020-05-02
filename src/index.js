import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import buildAst from './buildAst.js';
import format from './format';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');
const getData = (filepath) => parse(readFile(getFullPath(filepath)), getFormat(filepath));
const genDiff = (pathToFile1, pathToFile2, formatName = 'json') => {
  const parsedFile1 = getData(pathToFile1);
  const parsedFile2 = getData(pathToFile2);
  const astTree = buildAst(parsedFile1, parsedFile2);
  return format(astTree, formatName);
};
export default genDiff;

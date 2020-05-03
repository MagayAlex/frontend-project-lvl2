import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import buildAst from './buildAst.js';
import format from './format';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');
const getData = (filepath) => parse(readFile(filepath), getFormat(filepath));
const genDiff = (filepath1, filepath2, formatName = 'json') => {
  const fullFilepath1 = getFullPath(filepath1);
  const fullFilepath2 = getFullPath(filepath2);
  const data1 = getData(fullFilepath1);
  const data2 = getData(fullFilepath2);
  const astTree = buildAst(data1, data2);
  return format(astTree, formatName);
};
export default genDiff;

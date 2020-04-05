import { getAst, parser } from './parser.js';
import formatters from './formatters';

const genDiff = (pathToFile1, pathToFile2, type = 'json') => {
  const parsedFile1 = parser(pathToFile1);
  const parsedFile2 = parser(pathToFile2);
  const astTree = getAst(parsedFile1, parsedFile2);
  return formatters(astTree, type);
};
export default genDiff;

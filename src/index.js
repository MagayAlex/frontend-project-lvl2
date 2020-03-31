import lodash from 'lodash';
import parser from './parsers.js';

const {
  has, uniq, isEqual,
} = lodash;

const genDiff = (pathToFile1, pathToFile2) => {
  const parsedFile1 = parser(pathToFile1);
  const parsedFile2 = parser(pathToFile2);

  const buildObj = (key, value, atributes, children = []) => ({
    key, value, atributes, children,
  });
  const stringify = (x) => Object.entries(x).map(([key, value]) => `${key}: ${value}`).join('\n');
  const objToText = (obj, counter) => {
    const tab = '    ';
    const atr = (x) => {
      if (x === 'unmodified') {
        return tab;
      }
      if (x === 'added') {
        return '  + ';
      }
      return '  - ';
    };

    if (typeof obj.value === 'object') {
      return `\n${tab.repeat(counter)}${atr(obj.atributes)}${obj.key}: {\n${tab.repeat(counter + 2)}${stringify(obj.value)}\n${tab.repeat(counter + 1)}}`;
    }
    if (isEqual(obj.children, [])) {
      return `\n${tab.repeat(counter)}${atr(obj.atributes)}${obj.key}: ${obj.value}`;
    }

    return `\n${tab.repeat(counter)}${atr(obj.atributes)}${obj.key}: {${obj.children.map((node) => objToText(node, counter + 1)).join('')}\n${tab.repeat(counter + 1)}}`;
  };
  const iter = (data1, data2) => {
    const uniqueKeys = uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();
    const result = uniqueKeys.reduce((acc, key) => {
      if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        return [...acc, buildObj(key, '', 'unmodified', iter(data1[key], data2[key]))];
      }
      if (data1[key] === data2[key]) {
        return [...acc, buildObj(key, data1[key], 'unmodified', [])];
      }
      if (has(data1, key) && !has(data2, key)) {
        return [...acc, buildObj(key, data1[key], 'deleted', [])];
      }
      if (!has(data1, key) && has(data2, key)) {
        return [...acc, buildObj(key, data2[key], 'added', [])];
      }
      const x = [...acc, buildObj(key, data1[key], 'deleted', [])];
      return [...x, buildObj(key, data2[key], 'added', [])];
    }, []);
    return result;
  };
  const astTree = iter(parsedFile1, parsedFile2);

  const render = (tree) => tree.reduce((acc, node) => `${acc}${objToText(node, 0)}`,
    '');
  const x = render(astTree);
  // console.log('x= \n', astTree[0].children);
  return `{${x}\n}`;
};
export default genDiff;

import { flattenDeep } from 'lodash';

const valueToString = (nodeValue) => {
  if (typeof nodeValue === 'object') {
    return '[complex value]';
  }
  if (typeof nodeValue === 'string') {
    return `'${nodeValue}'`;
  }
  return String(nodeValue);
};
const makeDiff = (astTree, path) => astTree.map((node) => {
  const pathToProperty = [...path, node.key];
  switch (node.status) {
    case 'nested':
      return makeDiff(node.children, pathToProperty);
    case 'changed':
      return `Property '${pathToProperty.join('.')}' was changed from ${valueToString(node.oldValue)} to ${valueToString(node.newValue)}`;
    case 'deleted':
      return `Property '${pathToProperty.join('.')}' was deleted`;
    case 'added':
      return `Property '${pathToProperty.join('.')}' was added with value: ${valueToString(node.value)}`;
    default:
      return [];
  }
});
const buildPlainView = (data) => (flattenDeep(makeDiff(data, []))).join('\n');
export default buildPlainView;

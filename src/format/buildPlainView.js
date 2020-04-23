import { flattenDeep } from 'lodash';

const stringify = (nodeValue) => {
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
  const render = {
    nested: () => makeDiff(node.children, pathToProperty),
    changed: () => `Property '${pathToProperty.join('.')}' was changed from ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
    deleted: () => `Property '${pathToProperty.join('.')}' was deleted`,
    added: () => `Property '${pathToProperty.join('.')}' was added with value: ${stringify(node.value)}`,
    unchanged: () => [],
  };
  return render[node.status]();
});
const buildPlainView = (data) => (flattenDeep(makeDiff(data, []))).join('\n');
export default buildPlainView;

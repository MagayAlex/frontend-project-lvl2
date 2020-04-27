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
const mapping = {
  nested: (node, path, iter) => iter(node.children, path),
  changed: (node, path) => `Property '${path.join('.')}' was changed from ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
  deleted: (_, path) => `Property '${path.join('.')}' was deleted`,
  added: (node, path) => `Property '${path.join('.')}' was added with value: ${stringify(node.value)}`,
  unchanged: () => [],
};
const makeDiff = (astTree, path) => astTree.map(
  (node) => mapping[node.status](node, [...path, node.key], makeDiff),
);
const buildPlainView = (data) => flattenDeep(makeDiff(data, [])).join('\n');
export default buildPlainView;

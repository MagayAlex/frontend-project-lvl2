import { isObject, flattenDeep } from 'lodash';

const tab = '    ';
const makeTab = (count) => tab.repeat(count);
const stringify = (nodeValue, depth) => {
  if (isObject(nodeValue)) {
    const entries = Object.entries(nodeValue).map(([key, value]) => `${makeTab(depth + 2)}${key}: ${stringify(value, depth + 1)}`).join(`\n${makeTab(depth + 2)}`);
    return `{\n${entries}\n${makeTab(depth + 1)}}`;
  }
  return nodeValue;
};
const mapping = {
  nested: (node, depth, iter) => `${makeTab(depth)}    ${node.key}: ${iter(node.children, depth + 1)}`,
  changed: (node, depth) => [`${makeTab(depth)}  - ${node.key}: ${stringify(node.oldValue, depth)}`,
    `${makeTab(depth)}  + ${node.key}: ${stringify(node.newValue, depth)}`],
  unchanged: (node, depth) => `${makeTab(depth)}    ${node.key}: ${stringify(node.value, depth)}`,
  added: (node, depth) => `${makeTab(depth)}  + ${node.key}: ${stringify(node.value, depth)}`,
  deleted: (node, depth) => `${makeTab(depth)}  - ${node.key}: ${stringify(node.value, depth)}`,
};

const makeDiff = (astTree, depth) => {
  const output = flattenDeep(astTree.map((node) => mapping[node.status](node, depth, makeDiff))).join('\n');
  return `{\n${output}\n${makeTab(depth)}}`;
};
const renderTree = (data) => makeDiff(data, 0);
export default renderTree;

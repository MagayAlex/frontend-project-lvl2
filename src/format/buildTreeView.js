import { isObject } from 'lodash';

const tab = '    ';
const buildSymbol = (status) => {
  if (status === 'added') {
    return '  + ';
  }
  if (status === 'deleted') {
    return '  - ';
  }
  return tab;
};
const makeTab = (count) => `${tab.repeat(count)}`;
const stringify = (nodeValue, tabSize) => {
  if (isObject(nodeValue)) {
    return `{\n${makeTab(tabSize + 2)}${Object.entries(nodeValue).map(([key, value]) => `${key}: ${value}`).join()}\n${makeTab(tabSize + 1)}}`;
  }
  return nodeValue;
};
const render = (node, depth = 0) => {
  if (node.status === 'nested') {
    return `\n${makeTab(depth)}${buildSymbol(node.status)}${node.key}: {${node.children.map((child) => render(child, depth + 1)).join('')}\n${makeTab(depth + 1)}}`;
  }
  if (node.status === 'changed') {
    return `\n${makeTab(depth)}${buildSymbol('deleted')}${node.key}: ${stringify(node.oldValue, depth)}\n${makeTab(depth)}${buildSymbol('added')}${node.key}: ${stringify(node.newValue, depth)}`;
  }
  return `\n${makeTab(depth)}${buildSymbol(node.status)}${node.key}: ${stringify(node.value, depth)}`;
};
const buildTreeView = (data) => {
  const x = data.reduce((acc, node) => `${acc}${render(node, 0)}`, '');
  return `{${x}\n}`;
};
export default buildTreeView;

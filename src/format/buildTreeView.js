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
const stringify = (nodeValue) => `${Object.entries(nodeValue).map(([key, value]) => `${key}: ${value}`).join()}`;
const render = (node, depth = 0) => {
  const makeTab = (count) => `${tab.repeat(count)}`;
  if (node.status === 'changed') {
    if (isObject(node.newValue) && isObject(node.oldValue)) {
      return `\n${makeTab(depth)}${buildSymbol('deleted')}${node.key}: {\n${makeTab(depth + 2)}${stringify(node.oldValue)}\n${makeTab(depth + 1)}
      \n${tab.repeat(depth)}${buildSymbol('added')}${node.key}: {\n${makeTab(depth + 2)}${stringify(node.newValue)}{\n${makeTab(depth + 1)}`;
    }
    if (typeof node.newValue === 'object') {
      return `\n${makeTab(depth)}${buildSymbol('deleted')}${node.key}: ${node.oldValue}\n${makeTab(depth)}${buildSymbol('added')}${node.key}: {\n${makeTab(depth + 2)}${stringify(node.newValue)}\n${makeTab(depth + 1)}}`;
    }
    if (typeof node.oldValue === 'object') {
      return `\n${makeTab(depth)}${buildSymbol('deleted')}${node.key}: {\n${makeTab(depth + 2)}${stringify(node.oldValue)}\n${makeTab(depth + 1)}}\n${makeTab(depth)}${buildSymbol('added')}${node.key}: ${node.newValue}`;
    }
    return `\n${makeTab(depth)}${buildSymbol('deleted')}${node.key}: ${node.oldValue}\n${makeTab(depth)}${buildSymbol('added')}${node.key}: ${node.newValue}`;
  }
  if (node.status === 'nested') {
    return `\n${makeTab(depth)}${buildSymbol(node.status)}${node.key}: {${node.children.map((child) => render(child, depth + 1)).join('')}\n${makeTab(depth + 1)}}`;
  }
  if (node.status === 'unchanged') {
    if (typeof node.value === 'object') {
      return `\n${makeTab(depth)}${buildSymbol(node.status)}${node.key}: \n${makeTab(depth + 2)}${stringify(node.value)}\n${makeTab(depth + 1)}}`;
    }
    return `\n${makeTab(depth)}${buildSymbol(node.status)}${node.key}: ${(node.value)}`;
  }
  if (node.status === 'added') {
    if (typeof node.value === 'object') {
      return `\n${makeTab(depth)}${buildSymbol(node.status)}${node.key}: {\n${makeTab(depth + 2)}${stringify(node.value)}\n${makeTab(depth + 1)}}`;
    }
    return `\n${makeTab(depth)}${buildSymbol(node.status)}${node.key}: ${(node.value)}`;
  }
  if (node.status === 'deleted') {
    if (isObject(node.value)) {
      return `\n${makeTab(depth)}${buildSymbol(node.status)}${node.key}: {\n${makeTab(depth + 2)}${stringify(node.value)}\n${makeTab(depth + 1)}}`;
    }
    return `\n${makeTab(depth)}${buildSymbol(node.status)}${node.key}: ${(node.value)}`;
  }
  return true;
};
const buildTreeView = (data) => {
  const x = data.reduce((acc, node) => `${acc}${render(node, 0)}`, '');
  return `{${x}\n}`;
};

export default buildTreeView;

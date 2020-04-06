import lodash from 'lodash';

const {
  flattenDeep,
} = lodash;

const plainView = (data) => {
  const getValue = (x) => {
    switch (typeof x) {
      case 'string':
        return `'${x}'`;
      case 'boolean':
        return `${x}`;
      case 'number':
        return `${x}`;
      default:
        return '[complex value]';
    }
  };
  const result = (astTree, acc) => astTree.map((node) => {
    if (node.atr === 'changed') {
      return `Property '${[...acc, node.key].join('.')}' was changed from ${getValue(node.oldValue)} to ${getValue(node.newValue)}`;
    }
    if (node.atr === 'deleted') {
      return `Property '${[...acc, node.key].join('.')}' was deleted`;
    }
    if (node.atr === 'added') {
      return `Property '${[...acc, node.key].join('.')}' was added with value: ${getValue(node.value)}`;
    }
    if (node.children) {
      return result(node.children, [...acc, node.key]);
    }
    return [];
  });
  return flattenDeep(result(data, [])).join('\n');
};
export default plainView;

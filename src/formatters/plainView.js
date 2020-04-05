import lodash from 'lodash';

const {
  flattenDeep,
} = lodash;

const plainView = (data) => {
  const getValue = (x) => {
    if (typeof x === 'string') {
      return `'${x}'`;
    }
    if (typeof x === 'boolean' || typeof x === 'number') {
      return `${x}`;
    }
    return '[complex value]';
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
  const x = flattenDeep(result(data, [])).join('\n');
  console.log('Result:');
  console.log(x);
  return x;
};
export default plainView;

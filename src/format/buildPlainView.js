const valueToString = (nodeValue) => {
  if (typeof nodeValue === 'object') {
    return '[complex value]';
  }
  switch (typeof nodeValue) {
    case 'boolean':
      return `${nodeValue}`;
    case 'number':
      return `${nodeValue}`;
    default:
      return `'${nodeValue}'`;
  }
};
const makeDiff = (astTree, path) => astTree.map((node) => {
  const pathToProperty = [...path, node.key];
  if (node.children) {
    return makeDiff(node.children, pathToProperty);
  }
  switch (node.status) {
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
const buildPlainView = (data) => (makeDiff(data, [])).flat(Infinity).join('\n');
export default buildPlainView;

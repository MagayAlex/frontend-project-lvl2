const tab = '    ';
const atr = (x) => {
  if (x === 'unchanged' || x === 'changed') {
    return tab;
  }
  if (x === 'added') {
    return '  + ';
  }
  if (x === 'deleted') return '  - ';
  return 'ne naideno';
};

const render = (obj, counter = 0) => {
  const stringify = (x) => {
    const temp = `{\n${tab.repeat(counter + 2)}${Object.entries(x).map(([key, value]) => `${key}: ${value}`).join()}\n${tab.repeat(counter + 1)}}`;
    return typeof x === 'object' ? temp : `${x}`;
  };
  if (obj.atr === 'changed') {
    return `\n${tab.repeat(counter)}${atr('deleted')}${obj.key}: ${stringify(obj.oldValue)}\n${tab.repeat(counter)}${atr('added')}${obj.key}: ${stringify(obj.newValue)}`;
  }
  if (obj.children) {
    return `\n${tab.repeat(counter)}${atr(obj.atr)}${obj.key}: {${obj.children.map((node) => render(node, counter + 1)).join('')}\n${tab.repeat(counter + 1)}}`;
  }
  return `\n${tab.repeat(counter)}${atr(obj.atr)}${obj.key}: ${stringify(obj.value)}`;
};
const buildTreeView = (data) => {
  const x = data.reduce((acc, node) => `${acc}${render(node, 0)}`, '');
  return `{${x}\n}`;
};

export default buildTreeView;

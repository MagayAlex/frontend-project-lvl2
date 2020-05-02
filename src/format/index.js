import buildTreeView from './tree.js';
import buildPlainView from './plain.js';
import buildJsonView from './json.js';

const mapping = {
  tree: buildTreeView,
  plain: buildPlainView,
  json: buildJsonView,
};
export default (data, formatName) => {
  const format = mapping[formatName];
  if (!format) {
    throw new Error(`Unknown format type: '${formatName}'!`);
  }
  return format(data);
};

import buildTreeView from './tree.js';
import buildPlainView from './plain.js';
import buildJsonView from './json.js';

const mapping = {
  tree: buildTreeView,
  plain: buildPlainView,
  json: buildJsonView,
};
export default (data, type) => {
  const format = mapping[type];
  if (!format) {
    throw new Error(`Unknown format type: '${type}'!`);
  }
  return format(data);
};

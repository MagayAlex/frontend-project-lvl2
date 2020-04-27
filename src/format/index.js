import buildTreeView from './tree.js';
import buildPlainView from './plain.js';
import buildJsonView from './json.js';

const mapping = {
  tree: (data) => buildTreeView(data),
  plain: (data) => buildPlainView(data),
  json: (data) => buildJsonView(data),
};
export default (data, type) => {
  if (!mapping[type]) {
    throw new Error(`Unknown format type: '${type}'!`);
  }
  return mapping[type](data);
};

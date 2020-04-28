import buildTreeView from './tree.js';
import buildPlainView from './plain.js';
import buildJsonView from './json.js';

const mapping = {
  tree: (data) => buildTreeView(data),
  plain: (data) => buildPlainView(data),
  json: (data) => buildJsonView(data),
};
export default (data, type) => {
  if (mapping[type]) {
    return mapping[type](data);
  }
  throw new Error(`Unknown format type: '${type}'!`);
};

import buildTreeView from './tree.js';
import buildPlainView from './plain.js';
import buildJsonView from './json.js';

export default (data, type) => {
  if (type === 'tree') {
    return buildTreeView(data);
  }
  if (type === 'plain') {
    return buildPlainView(data);
  }
  if (type === 'json') {
    return buildJsonView(data);
  }
  return 'error: unsupported type';
};

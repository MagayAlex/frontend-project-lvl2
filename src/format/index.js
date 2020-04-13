import buildTreeView from './buildTreeView.js';
import buildPlainView from './buildPlainView.js';
import buildJsonView from './buildJsonView.js';

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

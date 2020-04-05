import treeView from './treeView.js';
import plainView from './plainView.js';
import jsonView from './jsonView.js';

export default (data, type) => {
  if (type === 'tree') {
    return treeView(data);
  }
  if (type === 'plain') {
    return plainView(data);
  }
  if (type === 'json') {
    return jsonView(data);
  }
  return 'error: unsupported type';
};

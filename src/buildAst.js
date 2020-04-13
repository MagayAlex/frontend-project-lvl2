import lodash from 'lodash';

const {
  has, uniq,
} = lodash;

const buildAst = (data1, data2) => {
  const uniqueKeys = uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();
  return uniqueKeys.reduce((acc, key) => {
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return [...acc, { atr: 'unchanged', key, children: buildAst(data1[key], data2[key]) }];
    }
    if (data1[key] === data2[key]) {
      return [...acc, { atr: 'unchanged', key, value: data1[key] }];
    }
    if (has(data1, key) && !has(data2, key)) {
      return [...acc, { atr: 'deleted', key, value: data1[key] }];
    }
    if (!has(data1, key) && has(data2, key)) {
      return [...acc, { atr: 'added', key, value: data2[key] }];
    }
    return [...acc, {
      atr: 'changed', key, newValue: data2[key], oldValue: data1[key],
    }];
  }, []);
};
export default buildAst;

import {
  has, uniq, isObject, flattenDeep,
} from 'lodash';

const buildAst = (data1, data2) => {
  const uniqueKeys = uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();
  return flattenDeep(uniqueKeys.map((key) => {
    if (!has(data2, key)) {
      return [{ status: 'deleted', key, value: data1[key] }];
    }
    if (!has(data1, key)) {
      return [{ status: 'added', key, value: data2[key] }];
    }
    if (isObject(data1[key]) && isObject(data2[key])) {
      return [{ status: 'nested', key, children: buildAst(data1[key], data2[key]) }];
    }
    if (data1[key] === data2[key]) {
      return [{ status: 'unchanged', key, value: data1[key] }];
    }

    return [{
      status: 'changed', key, newValue: data2[key], oldValue: data1[key],
    }];
  }));
};
export default buildAst;

import { has, uniq } from 'lodash';

const buildAst = (data1, data2) => {
  const uniqueKeys = uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();
  return uniqueKeys.reduce((acc, key) => {
    if (!has(data2, key)) {
      return [...acc, { status: 'deleted', key, value: data1[key] }];
    }
    if (!has(data1, key)) {
      return [...acc, { status: 'added', key, value: data2[key] }];
    }    
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return [...acc, { status: 'nested', key, children: buildAst(data1[key], data2[key]) }];
    }
    if (data1[key] === data2[key]) {
      return [...acc, { status: 'nested', key, value: data1[key] }];
    }

    return [...acc, {
      status: 'changed', key, newValue: data2[key], oldValue: data1[key],
    }];
  }, []);
};
export default buildAst;

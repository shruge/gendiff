import _ from 'lodash';
import isObject from './helpers.js';

const getAllKeys = (data1, data2) => {
  const keys = [...Object.keys(data1), ...Object.keys(data2)];

  return _.sortBy(Array.from(new Set(keys)));
};

const genTree = (file1, file2) => {
  const keys = getAllKeys(file1, file2);

  return keys.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return ({
        key,
        value: file2[key],
        state: 'added',
      });
    }
    if (!Object.hasOwn(file2, key)) {
      return ({
        key,
        value: file1[key],
        state: 'removed',
      });
    }
    if (isObject(file1[key]) && isObject(file2[key])) {
      return ({
        key,
        items: genTree(file1[key], file2[key]),
        state: 'nested',
      });
    }
    if (file1[key] !== file2[key]) {
      return ({
        key,
        oldValue: file1[key],
        newValue: file2[key],
        state: 'changed',
      });
    }

    return ({
      key,
      value: file1[key],
      state: 'unchanged',
    });
  });
};

export default genTree;

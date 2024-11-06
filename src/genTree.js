import isObject from './helpers.js';

const getAllKeys = (data1, data2) => (
  [...Array.from(new Set(Object.keys(data1).concat(Object.keys(data2))))].sort()
);

const genTree = (file1, file2) => {
  const keys = getAllKeys(file1, file2);

  return keys.reduce((acc, key) => {
    if (!Object.hasOwn(file1, key)) {
      acc.push({
        key,
        value: file2[key],
        state: 'added',
      });
    } else if (!Object.hasOwn(file2, key)) {
      acc.push({
        key,
        value: file1[key],
        state: 'removed',
      });
    } else if (isObject(file1[key]) && isObject(file2[key])) {
      acc.push({
        key,
        items: genTree(file1[key], file2[key]),
        state: 'nested',
      });
    } else if (file1[key] !== file2[key]) {
      acc.push({
        key,
        oldValue: file1[key],
        newValue: file2[key],
        state: 'changed',
      });
    } else acc.push({ key, value: file1[key], state: 'unchanged' });

    return acc;
  }, []);
};

export default genTree;

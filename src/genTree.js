import isObject from './helpers.js';

const getAllKeys = (data1, data2) => {
  const keys = [...Object.keys(data1), ...Object.keys(data2)];

  return Array.from(new Set(keys)).sort();
};

const genTree = (file1, file2) => {
  const keys = getAllKeys(file1, file2);

  return keys.map((key) => {
    const temp = {};

    if (!Object.hasOwn(file1, key)) {
      temp.key = key;
      temp.value = file2[key];
      temp.state = 'added';
    } else if (!Object.hasOwn(file2, key)) {
      temp.key = key;
      temp.value = file1[key];
      temp.state = 'removed';
    } else if (isObject(file1[key]) && isObject(file2[key])) {
      temp.key = key;
      temp.items = genTree(file1[key], file2[key]);
      temp.state = 'nested';
    } else if (file1[key] !== file2[key]) {
      temp.key = key;
      temp.oldValue = file1[key];
      temp.newValue = file2[key];
      temp.state = 'changed';
    } else {
      temp.key = key;
      temp.value = file1[key];
      temp.state = 'unchanged';
    }

    return temp;
  });
};

export default genTree;

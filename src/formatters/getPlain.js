import { isObject, getAllKeys } from './helpers.js';

const getValueOrString = (value) => {
  if (isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const getPlain = (file1, file2) => {
  const recursion = (data1, data2, path = '') => {
    const keys = getAllKeys(data1, data2);

    return keys.reduce((acc, key) => {
      const currentPath = path ? `${path}.${key}` : key;

      if (!Object.hasOwn(data2, key)) {
      // eslint-disable-next-line no-param-reassign
        acc += `Property '${currentPath}' was removed\n`;
      } else if (!Object.hasOwn(data1, key)) {
        const value = getValueOrString(data2[key]);
        // eslint-disable-next-line no-param-reassign
        acc += `Property '${currentPath}' was added with value: ${value}\n`;
      } else if (isObject(data1[key]) && isObject(data2[key])) {
        // eslint-disable-next-line no-param-reassign
        acc += recursion(data1[key], data2[key], currentPath);
      } else if (data1[key] !== data2[key]) {
        const value1 = getValueOrString(data1[key]);
        const value2 = getValueOrString(data2[key]);
        // eslint-disable-next-line no-param-reassign
        acc += `Property '${currentPath}' was updated. From ${value1} to ${value2}\n`;
      }

      return acc;
    }, '');
  };

  return recursion(file1, file2).trim();
};

export default getPlain;

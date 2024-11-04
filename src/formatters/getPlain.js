import { isObject, getAllKeys, getValueOrString } from './helpers.js';

const getPlain = (file1, file2) => {
  const recursion = (data1, data2, path = '') => {
    const keys = getAllKeys(data1, data2);

    return keys.reduce((acc, key) => {
      const currentPath = path ? `${path}.${key}` : key;

      if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      // eslint-disable-next-line no-param-reassign
        acc += `Property '${currentPath}' was removed\n`;
      } else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      // eslint-disable-next-line no-param-reassign
        acc += `Property '${currentPath}' was added with value: ${getValueOrString(data2[key])}\n`;
      } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        if (isObject(data1[key]) && isObject(data2[key])) {
        // eslint-disable-next-line no-param-reassign
          acc += recursion(data1[key], data2[key], currentPath);
        } else if (data1[key] !== data2[key]) {
        // eslint-disable-next-line no-param-reassign
          acc += `Property '${currentPath}' was updated. From ${getValueOrString(data1[key])} to ${getValueOrString(data2[key])}\n`;
        }
      }

      return acc;
    }, '');
  };

  return recursion(file1, file2).trim();
};

export default getPlain;

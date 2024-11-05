import { isObject, getAllKeys } from './helpers.js';

const toStringify = (data, replacer = ' ', spacesCount = 4, depth = 1) => {
  if (!isObject(data)) return data;

  const entries = Object.entries(data);
  const indents = replacer.repeat((spacesCount * depth) - 2);

  return `${entries.reduce((acc, [key, value]) => {
    if (!isObject(value)) return `${acc}\n${indents}${key}: ${value}`;
    return `${acc}\n${indents}${key}: ${toStringify(value, replacer, spacesCount, depth + 1)}`;
  }, '{')}\n${indents.slice(0, -2)}}`;
};

const getStylish = (file1, file2) => {
  const recursion = (data1, data2) => {
    const keys = getAllKeys(data1, data2);

    return keys.reduce((acc, key) => {
      const value1 = data1[key];
      const value2 = data2[key];

      if (!Object.hasOwn(data2, key)) {
        // eslint-disable-next-line no-param-reassign
        acc[`- ${key}`] = isObject(value1) ? recursion(value1, value1) : value1;
      } else if (!Object.hasOwn(data1, key)) {
        // eslint-disable-next-line no-param-reassign
        acc[`+ ${key}`] = isObject(value2) ? recursion(value2, value2) : value2;
      } else if (isObject(value1) && isObject(value2)) {
        // eslint-disable-next-line no-param-reassign
        acc[`  ${key}`] = recursion(value1, value2);
      } else if (value1 !== value2) {
        // eslint-disable-next-line no-param-reassign
        acc[`- ${key}`] = isObject(value1) ? recursion(value1, value1) : value1;
        acc[`+ ${key}`] = isObject(value2) ? recursion(value2, value2) : value2;
      } else {
        // eslint-disable-next-line no-param-reassign
        acc[`  ${key}`] = value1;
      }

      return acc;
    }, {});
  };

  return toStringify(recursion(file1, file2), ' ', 4);
};

export default getStylish;

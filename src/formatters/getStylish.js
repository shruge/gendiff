import { isObject, toStringify, getAllKeys } from './helpers.js';

const getStylish = (file1, file2) => {
  const recursion = (data1, data2) => {
    const keys = getAllKeys(data1, data2);

    return keys.reduce((acc, key) => {
      const value1 = data1[key];
      const value2 = data2[key];
      const existsInData1 = Object.hasOwn(data1, key);
      const existsInData2 = Object.hasOwn(data2, key);

      if (existsInData1 && !existsInData2) {
        // eslint-disable-next-line no-param-reassign
        acc[`- ${key}`] = isObject(value1) ? recursion(value1, value1) : value1;
      } else if (!existsInData1 && existsInData2) {
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

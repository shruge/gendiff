import { isObject, toStringify } from './helpers.js';

const getStylish = (file1, file2) => {
  const recursion = (data1, data2) => {
    const keys = Array.from(new Set(Object.keys(data1).concat(Object.keys(data2)))).sort();

    return keys.reduce((acc, key) => {
      const existsInData1 = Object.hasOwn(data1, key);
      const existsInData2 = Object.hasOwn(data2, key);

      if (existsInData1 && !existsInData2) {
        if (isObject(data1[key])) acc[`- ${key}`] = recursion(data1[key], data1[key]);
        else acc[`- ${key}`] = data1[key];
      } else if (!existsInData1 && existsInData2) {
        if (isObject(data2[key])) acc[`+ ${key}`] = recursion(data2[key], data2[key]);
        else acc[`+ ${key}`] = data2[key];
      } else if (isObject(data1[key]) && isObject(data2[key])) acc[`  ${key}`] = recursion(data1[key], data2[key]);
      else if (data1[key] !== data2[key]) {
        if (isObject(data1[key]) && !isObject(data2[key])) {
          acc[`- ${key}`] = recursion(data1[key], data1[key]);
          acc[`+ ${key}`] = data2[key];
          //        } else if (!isObject(data1[key]) && isObject(data2[key])) {
          //          acc[`+ ${key}`] = recursion(data2[key], data2[key]);
          //          acc[`- ${key}`] = data1[key];
        } else {
          acc[`- ${key}`] = data1[key];
          acc[`+ ${key}`] = data2[key];
        }
      } else acc[`  ${key}`] = data1[key];

      return acc;
    }, {});
  };

  return toStringify(recursion(file1, file2), ' ', 4);
};

export default getStylish;

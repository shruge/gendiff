import { getAllKeys } from './helpers.js';

const getJson = (file1, file2) => {
  const recursion = (data1, data2) => {
    const keys = getAllKeys(data1, data2);

    return keys.map((key) => {
      if (!Object.hasOwn(data1, key)) {
        return ({
          key,
          state: 'add',
          value: data2[key],
        });
      }
      if (!Object.hasOwn(data2, key)) {
        return ({
          key,
          state: 'remove',
          value: data1[key],
        });
      }
      if (data1[key] !== data2[key]) {
        return ({
          key,
          state: 'update',
          oldValue: data1[key],
          newValue: data2[key],
        });
      }

      return ({ key, state: 'no-changes', value: data1[key] });
    });
  };

  return JSON.stringify(recursion(file1, file2), ' ', 3);
};

export default getJson;

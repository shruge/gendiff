const isObject = (data) => {
  if (typeof data === 'object' && !Array.isArray(data) && data !== null && !(data instanceof Function)) return true;

  return false;
};

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
    const result = {};
    const keys = Array.from(new Set(Object.keys(data1).concat(Object.keys(data2)))).sort();

    keys.forEach((key) => {
      if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
        if (isObject(data1[key])) result[`- ${key}`] = recursion(data1[key], data1[key]);
        else result[`- ${key}`] = data1[key];
      } else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        if (isObject(data2[key])) result[`+ ${key}`] = recursion(data2[key], data2[key]);
        else result[`+ ${key}`] = data2[key];
      } else if (isObject(data1[key]) && isObject(data2[key])) result[`  ${key}`] = recursion(data1[key], data2[key]);
      else if (data1[key] !== data2[key]) {
        if (isObject(data1[key]) && !isObject(data2[key])) {
          result[`- ${key}`] = recursion(data1[key], data1[key]);
          result[`+ ${key}`] = data2[key];
        } else if (!isObject(data1[key]) && isObject(data2[key])) {
          result[`+ ${key}`] = recursion(data2[key], data2[key]);
          result[`- ${key}`] = data2[key];
        } else {
          result[`- ${key}`] = data1[key];
          result[`+ ${key}`] = data2[key];
        }
      } else result[`  ${key}`] = data1[key];
    });
    return result;
  };

  return toStringify(recursion(file1, file2), ' ', 4);
};

export default getStylish;

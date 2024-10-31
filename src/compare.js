const toStringify = (value, replacer = ' ', spacesCount = 1) => {
  const indents = replacer.repeat(spacesCount);

  return `${Object.keys(value).reduce((acc, key) => `${acc}\n${indents}${key}: ${value[key]}`, '{')}\n${indents.slice(0, -(replacer.length * spacesCount))}}`;
};

const compare = (file1, file2) => {
  const result = {};
  const keys = Array.from(new Set(Object.keys(file1).concat(Object.keys(file2)))).sort();

  keys.forEach((key) => {
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) result[`- ${key}`] = file1[key];
    else if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) result[`+ ${key}`] = file2[key];
    else if (file1[key] !== file2[key]) {
      result[`- ${key}`] = file1[key];
      result[`+ ${key}`] = file2[key];
    } else result[`  ${key}`] = file1[key];
  });

  return toStringify(result, ' ', 2);
};

export default compare;

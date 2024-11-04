export const isObject = (data) => {
  if (typeof data === 'object' && !Array.isArray(data) && data !== null && !(data instanceof Function)) return true;

  return false;
};

export const getValueOrString = (value) => {
  if (isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

export const toStringify = (data, replacer = ' ', spacesCount = 4, depth = 1) => {
  if (!isObject(data)) return data;

  const entries = Object.entries(data);
  const indents = replacer.repeat((spacesCount * depth) - 2);

  return `${entries.reduce((acc, [key, value]) => {
    if (!isObject(value)) return `${acc}\n${indents}${key}: ${value}`;
    return `${acc}\n${indents}${key}: ${toStringify(value, replacer, spacesCount, depth + 1)}`;
  }, '{')}\n${indents.slice(0, -2)}}`;
};

import isObject from '../helpers.js';

const toStringify = (data, depth = 1, replacer = ' ', spacesCount = 4) => {
  if (!isObject(data)) return String(data);

  const leftShift = 2;
  const signs = [' ', '+', '-'];
  const entries = Object.entries(data);
  const indents = replacer.repeat((spacesCount * depth) - leftShift);

  return `${entries.reduce((acc, [key, value]) => {
    if (!signs.includes(key[0])) {
      return `${acc}\n${indents}  ${key}: ${toStringify(value, depth + 1)}`;
    }
    return `${acc}\n${indents}${key}: ${toStringify(value, depth + 1)}`;
  }, '{')}\n${indents.slice(0, -leftShift)}}`;
};

const getStylish = (tree) => {
  const recursion = (arr) => arr.reduce((acc, obj) => {
    const {
      key, state, value,
      oldValue, newValue, items,
    } = obj;

    switch (state) {
      case 'removed': return { ...acc, [`- ${key}`]: value };
      case 'added': return { ...acc, [`+ ${key}`]: value };
      case 'nested': return { ...acc, [`  ${key}`]: recursion(items) };
      case 'changed': return {
        ...acc,
        [`- ${key}`]: oldValue,
        [`+ ${key}`]: newValue,
      };
      case 'unchanged': return { ...acc, [`  ${key}`]: value };
      default: throw new Error(`Unexpected '${state}' state`);
    }
  }, {});

  return toStringify(recursion(tree));
};

export default getStylish;

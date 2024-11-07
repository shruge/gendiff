import isObject from '../helpers.js';

const toStringify = (data, replacer = ' ', spacesCount = 4, depth = 1) => {
  if (!isObject(data)) return String(data);

  const leftShift = 2;
  const signs = [' ', '+', '-'];
  const entries = Object.entries(data);
  const indents = replacer.repeat((spacesCount * depth) - leftShift);

  return `${entries.reduce((acc, [key, value]) => {
    if (!signs.includes(key[0])) {
      return `${acc}\n${indents}  ${key}: ${toStringify(value, ' ', 4, depth + 1)}`;
    }
    return `${acc}\n${indents}${key}: ${toStringify(value, ' ', 4, depth + 1)}`;
  }, '{')}\n${indents.slice(0, -leftShift)}}`;
};

const getStylish = (tree) => {
  const recursion = (arr) => arr.reduce((acc, obj) => {
    const {
      key, state, value,
      oldValue, newValue, items,
    } = obj;
    const temp = {};

    switch (state) {
      case 'removed':
        temp[`- ${key}`] = value;
        break;
      case 'added':
        temp[`+ ${key}`] = value;
        break;
      case 'nested':
        temp[`  ${obj.key}`] = recursion(items);
        break;
      case 'changed':
        temp[`- ${key}`] = oldValue;
        temp[`+ ${key}`] = newValue;
        break;
      case 'unchanged':
        temp[`  ${key}`] = value;
        break;
      case undefined:
        temp[`  ${key}`] = value;
        break;
      default: throw new Error(`Unexpected '${state}' state`);
    }

    return { ...acc, ...temp };
  }, {});

  return toStringify(recursion(tree));
};

export default getStylish;

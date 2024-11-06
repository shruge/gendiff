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
    switch (obj.state) {
      case 'removed':
        acc[`- ${obj.key}`] = obj.value;
        break;
      case 'added':
        acc[`+ ${obj.key}`] = obj.value;
        break;
      case 'nested':
        acc[`  ${obj.key}`] = recursion(obj.items);
        break;
      case 'changed':
        acc[`- ${obj.key}`] = obj.oldValue;
        acc[`+ ${obj.key}`] = obj.newValue;
        break;
      case 'unchanged':
        acc[`  ${obj.key}`] = obj.value;
        break;
      case undefined:
        acc[`  ${obj.key}`] = obj.value;
        break;
      default: throw new Error(`Unexpected '${obj.state}' state`);
    }

    return acc;
  }, {});

  return toStringify(recursion(tree));
};

export default getStylish;

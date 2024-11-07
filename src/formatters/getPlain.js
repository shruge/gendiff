import isObject from '../helpers.js';

const getValueOrString = (value) => {
  if (isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return String(value);
};

const getPlain = (tree, path = '') => tree.reduce((acc, obj) => {
  const {
    key, state, value: val,
    oldValue: oldVal, newValue: newVal, items,
  } = obj;
  const temp = [];
  const value = getValueOrString(val);
  const oldValue = getValueOrString(oldVal);
  const newValue = getValueOrString(newVal);
  const currentPath = path ? `${path}.${key}` : key;

  switch (state) {
    case 'removed':
      temp.push(`\nProperty '${currentPath}' was removed`);
      break;
    case 'added':
      temp.push(`\nProperty '${currentPath}' was added with value: ${value}`);
      break;
    case 'nested':
      temp.push(`\n${getPlain(items, currentPath)}`);
      break;
    case 'changed':
      temp.push(`\nProperty '${currentPath}' was updated. From ${oldValue} to ${newValue}`);
      break;
    case 'unchanged': break;
    default: throw new Error(`Unexpected '${state}' state`);
  }

  return `${acc}${temp.join('')}`;
}, '').trim();

export default getPlain;

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
  const value = getValueOrString(val);
  const oldValue = getValueOrString(oldVal);
  const newValue = getValueOrString(newVal);
  const currentPath = path ? `${path}.${key}` : key;

  switch (state) {
    case 'removed':
      return `${acc}\nProperty '${currentPath}' was removed`;
    case 'added':
      return `${acc}\nProperty '${currentPath}' was added with value: ${value}`;
    case 'nested':
      return `${acc}\n${getPlain(items, currentPath)}`;
    case 'changed':
      return `${acc}\nProperty '${currentPath}' was updated. From ${oldValue} to ${newValue}`;
    case 'unchanged': return acc;
    default: throw new Error(`Unexpected '${state}' state`);
  }
}, '').trim();

export default getPlain;

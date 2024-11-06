import isObject from '../helpers.js';

const getValueOrString = (value) => {
  if (isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const getPlain = (tree, path = '') => tree.reduce((acc, obj) => {
  const currentPath = path ? `${path}.${obj.key}` : obj.key;
  const value = getValueOrString(obj?.value);
  const oldValue = getValueOrString(obj?.oldValue);
  const newValue = getValueOrString(obj?.newValue);

  switch (obj.state) {
    case 'removed':
      // eslint-disable-next-line no-param-reassign
      acc += `\nProperty '${currentPath}' was removed`;
      break;
    case 'added':
      // eslint-disable-next-line no-param-reassign
      acc += `\nProperty '${currentPath}' was added with value: ${value}`;
      break;
    case 'nested':
      // eslint-disable-next-line no-param-reassign
      acc += `\n${getPlain(obj.items, currentPath)}`;
      break;
    case 'changed':
      // eslint-disable-next-line no-param-reassign
      acc += `\nProperty '${currentPath}' was updated. From ${oldValue} to ${newValue}`;
      break;
    case 'unchanged': break;
    default: throw new Error(`Unexpected '${tree.state}' state`);
  }

  return acc;
}, '').trim();

export default getPlain;

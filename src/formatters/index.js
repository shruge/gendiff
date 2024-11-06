import getPlain from './getPlain.js';
import getStylish from './getStylish.js';

const selectOutFormat = (tree, format) => {
  switch (format) {
    case 'plain': return getPlain(tree);
    case 'stylish': return getStylish(tree);
    case 'json': return JSON.stringify(tree, ' ', 3);
    default: throw new Error(`Unexpected '${format}' convert format`);
  }
};

export default selectOutFormat;

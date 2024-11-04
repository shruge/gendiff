import getPlain from './getPlain.js';
import getStylish from './getStylish.js';

const selectOutFormat = (data1, data2, format) => {
  switch (format) {
    case 'plain': return getPlain(data1, data2);
    default: return getStylish(data1, data2);
  }
};

export default selectOutFormat;

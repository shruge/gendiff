import getJson from './getJson.js';
import getPlain from './getPlain.js';
import getStylish from './getStylish.js';

const selectOutFormat = (data1, data2, format) => {
  switch (format) {
    case 'json': return getJson(data1, data2);
    case 'plain': return getPlain(data1, data2);
    case 'stylish': return getStylish(data1, data2);
    default: throw new Error(`Unexpected ${format} format`);
  }
};

export default selectOutFormat;

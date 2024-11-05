export const isObject = (val) => {
  if (typeof val === 'object' && !Array.isArray(val) && val !== null && !(val instanceof Function)) {
    return true;
  }

  return false;
};
export const getAllKeys = (data1, data2) => (
  Array.from(new Set(Object.keys(data1).concat(Object.keys(data2)))).sort()
);

const isObject = (val) => (
  typeof val === 'object' && !Array.isArray(val) && val !== null && !(val instanceof Function)
);

export default isObject;

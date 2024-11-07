const isObject = (val) => (
  Object.prototype.toString.call(val).toLowerCase() === '[object object]'
);

export default isObject;

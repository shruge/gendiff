const isObject = (val) => {
  if (typeof val === 'object' && !Array.isArray(val) && val !== null && !(val instanceof Function)) {
    return true;
  }

  return false;
};

export default isObject;

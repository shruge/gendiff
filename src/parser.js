const parseData = (data, format) => {
  if (format === 'json') return JSON.parse(data);

  throw new Error(`Unexpected ${format} format`);
};

export default parseData;

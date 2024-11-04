import fs from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import parseData from './parsers.js';
import selectOutFormat from './formatters/index.js';

const getAbsPath = (filepath) => path.resolve(cwd(), filepath);
const getParsedData = (filepath) => {
  const absPath = getAbsPath(filepath);
  const fileExt = path.extname(absPath).slice(1);
  const data = fs.readFileSync(absPath, 'utf8');

  return parseData(data, fileExt);
};
const genDiff = (filepath1, filepath2, format) => {
  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);

  return selectOutFormat(data1, data2, format);
};

export default genDiff;

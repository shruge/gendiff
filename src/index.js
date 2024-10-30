import fs from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import parseData from './parser.js';

const getAbsPath = (filepath) => path.resolve(cwd(), filepath);
const getParsedData = (filepath) => {
  const absPath = getAbsPath(filepath);
  const fileExt = path.extname(absPath).slice(1);
  const data = fs.readFileSync(absPath, 'utf8');

  return parseData(data, fileExt);
};
const getDiff = (filepath1, filepath2) => {
  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);
  const mergedData = `{${JSON.stringify(data1)}, ${JSON.stringify(data2)}}`;

  return mergedData;
};

export default getDiff;

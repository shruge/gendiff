import fs from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import parseData from './parsers.js';
import genTree from './genTree.js';
import selectOutFormat from './formatters/index.js';

const getAbsPath = (filepath) => path.resolve(cwd(), filepath);
const getParsedData = (filepath) => {
  const absPath = getAbsPath(filepath);
  const fileExt = path.extname(absPath).slice(1);
  const data = fs.readFileSync(absPath, 'utf8');

  return parseData(data, fileExt);
};
const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);
  const tree = genTree(data1, data2);

  return selectOutFormat(tree, format);
};

export default genDiff;

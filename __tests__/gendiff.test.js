import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf8');

test('test genDiff', () => {
  const file1 = getFilePath('file1.json');
  const file2 = getFilePath('file2.json');
  const file1Err = getFilePath('file1');
  const file2Err = getFilePath('file2');
  const answer = readFile('expected');

  expect(`${genDiff(file1, file2)}\n`).toEqual(answer);
  expect(() => `${genDiff(file1Err, file2)}\n`).toThrow();
  expect(() => `${genDiff(file1, file2Err)}\n`).toThrow();
  expect(() => `${genDiff(file1Err, file2Err)}\n`).toThrow();
  expect(() => `${genDiff(null, null)}\n`).toThrow();
});

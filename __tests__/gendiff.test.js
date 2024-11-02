import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf8');

test('test genDiff', () => {
  const jsonFile1 = getFilePath('file1.json');
  const jsonFile2 = getFilePath('file2.json');
  const ymlFile1 = getFilePath('file1.yml');
  const ymlFile2 = getFilePath('file2.yml');
  const file1Err = getFilePath('file1');
  const file2Err = getFilePath('file2');
  const answer = readFile('expected').trim();

  expect(genDiff(jsonFile1, jsonFile2)).toEqual(answer);
  expect(genDiff(ymlFile1, ymlFile2)).toEqual(answer);
  expect(() => `${genDiff(file1Err, jsonFile2)}\n`).toThrow();
  expect(() => `${genDiff(ymlFile1, file2Err)}\n`).toThrow();
  expect(() => `${genDiff(file1Err, file2Err)}\n`).toThrow();
  expect(() => `${genDiff(null, null)}\n`).toThrow();
});

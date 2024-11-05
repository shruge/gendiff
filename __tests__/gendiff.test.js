import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf8');

describe('gendiff with different formats', () => {
  const jsonFile1 = getFilePath('file1.json');
  const jsonFile2 = getFilePath('file2.json');
  const ymlFile1 = getFilePath('file1.yml');
  const ymlFile2 = getFilePath('file2.yml');
  const file1Err = getFilePath('file1');
  const file2Err = getFilePath('file2');

  test('test stylish', () => {
    const answer = readFile('expectedStylish').trim();

    expect(genDiff(jsonFile1, jsonFile2)).toEqual(answer);
    expect(genDiff(ymlFile1, ymlFile2)).toEqual(answer);
    expect(() => genDiff(file1Err, jsonFile2)).toThrow();
    expect(() => genDiff(ymlFile1, file2Err)).toThrow();
    expect(() => genDiff(file1Err, file2Err)).toThrow();
    expect(() => genDiff(null, null)).toThrow();
  });

  test('test plain', () => {
    const answer = readFile('expectedPlain').trim();

    expect(genDiff(jsonFile1, jsonFile2, 'plain')).toEqual(answer);
    expect(genDiff(ymlFile1, ymlFile2, 'plain')).toEqual(answer);
    expect(() => genDiff(file1Err, jsonFile2, 'plain')).toThrow();
    expect(() => genDiff(ymlFile1, file2Err, 'plain')).toThrow();
    expect(() => genDiff(file1Err, file2Err, 'plain')).toThrow();
    expect(() => genDiff(null, null, 'plain')).toThrow();
  });

  test('test json', () => {
    const answer = readFile('expectedJSON').trim();

    expect(genDiff(jsonFile1, jsonFile2, 'json')).toEqual(answer);
    expect(genDiff(ymlFile1, ymlFile2, 'json')).toEqual(answer);
    expect(() => genDiff(file1Err, jsonFile2, 'json')).toThrow();
    expect(() => genDiff(ymlFile1, file2Err, 'json')).toThrow();
    expect(() => genDiff(file1Err, file2Err, 'json')).toThrow();
    expect(() => genDiff(null, null, 'json')).toThrow();
  });
});

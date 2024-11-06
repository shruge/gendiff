import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf8');

describe('gendiff with different formats', () => {
  test.each([
    { extensions: '.json', format: 'stylish', answerFile: 'Stylish' },
    { extensions: '.yml', format: 'stylish', answerFile: 'Stylish' },
    { extensions: '.json', format: 'plain', answerFile: 'Plain' },
    { extensions: '.yml', format: 'plain', answerFile: 'Plain' },
    { extensions: '.json', format: 'json', answerFile: 'JSON' },
    { extensions: '.yml', format: 'json', answerFile: 'JSON' },
  ])('genDiff -f $format', (testObj) => {
    const file1 = getFilePath(`file1${testObj.extensions}`);
    const file2 = getFilePath(`file2${testObj.extensions}`);
    const answer = readFile(`expected${testObj.answerFile}`).trim();

    expect(genDiff(file1, file2, testObj.format)).toEqual(answer);
  });
});

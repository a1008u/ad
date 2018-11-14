import { getJson } from '../../../src/atvad/ts/Iframe';

test('basic', () => {
  let result = getJson('https://localhost:3000', '010011a1');
  expect(result).isNot;
});

test('basic again', () => {
  expect(sum(1, 2)).toBe(3);
});


// (3): (1)を使うテスト対象を読み込む
import { LineCount } from '../src/foo';

// (1): テスト対象が依存するモジュールのモックを定義
jest.mock('fs', () => ({
  readFileSync: jest.fn(() => `first\n second\n third`),
}));
// (2): 検証用((4),(5))にモック読み込む
import * as fs from 'fs';


describe('サンプル', () => {
  const path = 'dummy';
  it('LineCount()', () => {
    const result = LineCount(path);

    console.log(result);
    expect(result).toBe(3);
    // expect(fs.readFileSync.mock.calls.length).toBe(1); // (4): モックが呼ばれたか検証
    // expect(fs.readFileSync.mock.calls[0][0]).toBe(path); // (5): モックが呼ばれた際の引数を検証
  });
});
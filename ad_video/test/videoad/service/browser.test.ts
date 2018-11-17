import { browser } from '../../../src/videoad/service/browser';

describe('ブラウザ', () => {
  test('正常(jestの機能では、ブラウザを取得できない)', async () => {
    // exe
    const result = await browser.ck();

    // ck
    expect(result).toEqual('unknown');
  });
});

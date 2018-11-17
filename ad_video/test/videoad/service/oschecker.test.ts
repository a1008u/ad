import { oschecker } from '../../../src/videoad/service/oschecker';
import * as Platform from 'platform';

describe('ブラウザ', () => {
  test('正常(pcと判定)', async () => {
    // exe
    const result = await oschecker.isolate();

    // ck
    expect(result).toEqual('pc');
  });
});

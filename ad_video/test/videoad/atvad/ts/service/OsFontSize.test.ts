import { osFontSize } from '../../../../../src/videoad/atvad/ts/service/OsFontSize';
import { oschecker } from '../../../../../src/videoad/service/oschecker';

const smartPhoneSize: string[] = ['16px', '12px', '5px', '10px'];
const pcSize: string[] = ['22px', '20px', '10px', '20px'];

describe('フォントサイズ判定', () => {
  test('正常(pcと判定)', async () => {
    // exe
    const target: string = oschecker.isolate();
    const pcSizeResult = await osFontSize.getSize[target]();

    // ck
    expect(pcSizeResult).toEqual(pcSize);
  });

  test('正常(iosと判定)', async () => {
    // exe
    const iosTarget: string = 'ios';
    const iosSize = await osFontSize.getSize[iosTarget]();

    // ck
    expect(iosSize).toEqual(smartPhoneSize);
  });

  test('正常(androidと判定)', async () => {
    // exe
    const androidTarget: string = 'android';
    const androidSize = await osFontSize.getSize[androidTarget]();

    // ck
    expect(androidSize).toEqual(smartPhoneSize);
  });

  test('正常(windowsphoneと判定)', async () => {
    // exe
    const windowsphoneTarget: string = 'windowsphone';
    const windowsphoneSize = await osFontSize.getSize[windowsphoneTarget]();

    // ck
    expect(windowsphoneSize).toEqual(smartPhoneSize);
  });
});

import { Jsontype } from '../../../src/vat/service/class/jsontype';
import { AsyncTransmission } from '../../../src/vat/service/AsyncTransmission';
import { Jsonentry } from '../../../src/vat/service/class/jsonentry';

const asyncTransmission: AsyncTransmission = new AsyncTransmission();
const domain: string = 'http://localhost:3000';
const rkValue = '010011a1';

describe('iframeで表示するvideoなどのデータ取得確認', () => {
  test('正常', async () => {
    const result: Jsontype = await asyncTransmission.getJson(domain, rkValue);
    expect(result.rk).toEqual(rkValue);
  });
});

describe('2回目以降のxhr送信(v3なし)の確認', () => {

  beforeEach(() => {
    window.history.pushState({}, 'Test Title', '/test.html?url=http%3A//localhost%3A3000/click');
  });
  test('正常', async () => {
    const rkValue = '01005gtr000005'
    const result: Jsonentry = await asyncTransmission.getJsonViaQuerry();
    expect(result.rk).toEqual(rkValue);
  });
});

describe('2回目以降のxhr送信(v3有)の確認', () => {

  beforeEach(() => {
    window.history.pushState({}, 'Test Title', '/test.html?url=http%3A//localhost%3A3000/click?test=test');
  });
  test('正常', async () => {
    const v3 = '1';
    const rkValue = '01005gtr000005';
    const result: Jsonentry = await asyncTransmission.getJsonViaQuerryPlusV3(v3)
    console.log('result : ', result);
    expect(result.rk).toEqual(rkValue);
  });
});

describe('iframeで表示するvideoなどのデータ取得確認(preview用)', () => {
  const movieURL = 'testURL';
  const height = '640';
  const width = '360';
  const bannerText = 'this is the test';
  const btnText = 'test button';
  const videoFrameUrl = 'videoFrameUrl';
  const entryFrameUrl = 'entryFrameUrl';
  const impressionUrl = 'impressionUrl';

  test('正常', async () => {
    const result: Jsontype = await asyncTransmission.getPreviewJson(movieURL, height, width, bannerText, btnText, videoFrameUrl, entryFrameUrl, impressionUrl);
    const confirmJson = new Jsontype(
      movieURL,
      bannerText,
      '',
      height,
      width,
      '0',
      btnText,
      '',
      videoFrameUrl,
      entryFrameUrl,
      impressionUrl
    );
    expect(result).toEqual(confirmJson);
  });
});

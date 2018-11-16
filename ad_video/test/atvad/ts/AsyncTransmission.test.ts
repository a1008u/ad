import { Jsontype } from '../../../src/videoad/service/jsontype';
import { AsyncTransmission } from '../../../src/atvad/ts/AsyncTransmission';

const asyncTransmission: AsyncTransmission = new AsyncTransmission();
const domain: string = 'http://localhost:3000';
const rkValue = '010011a1';

describe('iframeで表示するvideoなどのデータ取得確認', () => {
  test('正常', async () => {
    const result: Jsontype = await asyncTransmission.getJson(domain, rkValue);
    expect(result.rk).toEqual(rkValue);
  });
});

describe('iframeで表示するvideoなどのデータ取得確認(preview用)', () => {
  const movieURL = 'testURL';
  const height = '640';
  const width = '360';
  const bannerText = 'this is the test';
  const btnText = 'test button';
  const videoFrameUrl = 'videoFrameUrl ';
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

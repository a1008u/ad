import { EventNotViewThrough } from '../../../../../src/vat/atvad/ts/service/EventNotViewThrough';
import { Jsontype } from '../../../../../src/vat/service/class/jsontype';
import { oschecker } from '../../../../../src/vat/service/oschecker';

describe('mkAdAreaの確認', () => {
  test('preview PC版', async () => {
    // prepare
    const movieURL = 'testURL';
    const height = '640';
    const width = '360';
    const bannerText = 'this is the test';
    const btnText = 'test button';
    const videoFrameUrl = 'http://localhost:3000/imp';
    const entryFrameUrl = 'entryFrameUrl';
    const impressionUrl = 'impressionUrl';
    const atvjson: Jsontype = new Jsontype(
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
    atvjson.ATV_MODE = 'previewPcAdarea';

    // exe
    const resultAdAreaElement: string = EventNotViewThrough.mkAdArea(atvjson);

    // ck
    expect(resultAdAreaElement).not.toBeNull();
  });

  test('preview SP版', async () => {
    // prepare
    const movieURL = 'testURL';
    const height = '320';
    const width = '180';
    const bannerText = 'this is the test';
    const btnText = 'test button';
    const videoFrameUrl = 'http://localhost:3000/imp';
    const entryFrameUrl = 'entryFrameUrl';
    const impressionUrl = 'impressionUrl';
    const atvjson: Jsontype = new Jsontype(
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
    atvjson.ATV_MODE = 'previewSpAdarea';

    // exe
    const resultAdAreaElement: string = EventNotViewThrough.mkAdArea(atvjson);

    // ck
    expect(resultAdAreaElement).not.toBeNull();
  });

  test('preview以外 PC版', async () => {
    // prepare
    const movieURL = 'testURL';
    const height = '640';
    const width = '360';
    const bannerText = 'this is the test';
    const btnText = 'test button';
    const videoFrameUrl = 'http://localhost:3000/imp';
    const entryFrameUrl = 'entryFrameUrl';
    const impressionUrl = 'impressionUrl';
    const atvjson: Jsontype = new Jsontype(
      movieURL,
      bannerText,
      'test.html',
      height,
      width,
      '0',
      btnText,
      '',
      videoFrameUrl,
      entryFrameUrl,
      impressionUrl
    );
    atvjson.ATV_MODE = '';

    // exe
    const resultAdAreaElement: string = EventNotViewThrough.mkAdArea(atvjson);

    // ck
    expect(resultAdAreaElement).not.toBeNull();
  });
});

describe('mkAdAreaの確認②', () => {

  beforeEach(() => {
    // spyの設定
    jest.spyOn(oschecker, 'isolate').mockReturnValue('ios');
  });

  afterEach(() => {
    // spyの削除
    jest.spyOn(oschecker, 'isolate').mockRestore();
  });

  test('preview以外 SP版', async () => {
    // prepare
    const movieURL = 'testURL';
    const height = '320';
    const width = '180';
    const bannerText = 'this is the test';
    const btnText = 'test button';
    const videoFrameUrl = 'http://localhost:3000/imp';
    const entryFrameUrl = 'entryFrameUrl';
    const impressionUrl = 'impressionUrl';
    const atvjson: Jsontype = new Jsontype(
      movieURL,
      bannerText,
      'testsp.html',
      height,
      width,
      '0',
      btnText,
      '',
      videoFrameUrl,
      entryFrameUrl,
      impressionUrl
    );
    atvjson.ATV_MODE = '';

    // exe
    const resultAdAreaElement: string = EventNotViewThrough.mkAdArea(atvjson);

    // ck
    expect(resultAdAreaElement).not.toBeNull();
  });
});

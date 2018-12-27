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
    const adAreaElement: string = `<div class=\"__divTextElement\" style=\"height:px\">
      <div class=\"__divTextLeftElement\" style=\"font-size:22px\">
        <span class=\"__atv_text\">this is the test</span>
      </div>
      <div class=\"__divTextRightElement\">
        <a class=\"__atv_text\" href=\"#!\"  /\">
          <span class=\"__atv_button\" ontouchstart=\"\" style=\"font-size:20px; padding:10px 20px\">test button</>
        </a>
      </div>
    </div>`;
    expect(resultAdAreaElement).not.toBeNull();
    expect(resultAdAreaElement).toEqual(adAreaElement);
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
    const adAreaElement: string = `<div class=\"__divTextElement\" style=\"height:px\">
      <div class=\"__divTextLeftElement\" style=\"font-size:16px\">
        <span class=\"__atv_text\">this is the test</span>
      </div>
      <div class=\"__divTextRightElement\">
        <a class=\"__atv_text\" href=\"#!\"  /\">
          <span class=\"__atv_button\" ontouchstart=\"\" style=\"font-size:12px; padding:5px 10px\">test button</>
        </a>
      </div>
    </div>`;
    expect(resultAdAreaElement).not.toBeNull();
    expect(resultAdAreaElement).toEqual(adAreaElement);
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
    const adAreaElement: string = `<div class=\"__divTextElement\" style=\"height:px\">
      <div class=\"__divTextLeftElement\" style=\"font-size:22px\">
        <span class=\"__atv_text\">this is the test</span>
      </div>
      <div class=\"__divTextRightElement\">
        <a class=\"__atv_text\" href=\"test.html\" target="_blank" /\">
          <span class=\"__atv_button\" ontouchstart=\"\" style=\"font-size:20px; padding:10px 20px\">test button</>
        </a>
      </div>
    </div>`;
    expect(resultAdAreaElement).not.toBeNull();
    expect(resultAdAreaElement).toEqual(adAreaElement);
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
    const adAreaElement: string = `<div class=\"__divTextElement\" style=\"height:px\">
      <div class=\"__divTextLeftElement\" style=\"font-size:16px\">
        <span class=\"__atv_text\">this is the test</span>
      </div>
      <div class=\"__divTextRightElement\">
        <a class=\"__atv_text\" href=\"testsp.html\" target="_blank" /\">
          <span class=\"__atv_button\" ontouchstart=\"\" style=\"font-size:12px; padding:5px 10px\">test button</>
        </a>
      </div>
    </div>`;
    expect(resultAdAreaElement).not.toBeNull();
    expect(resultAdAreaElement).toEqual(adAreaElement);
  });
});

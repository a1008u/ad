import { EventViewThrough } from "../../../../../src/videoad/atvad/ts/service/EventViewThrough";
import { Jsontype } from "../../../../../src/videoad/service/class/jsontype";

describe('viewThroughActionのチェック', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = '<div><video id="atvVideo" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" ___filter="off" width="640"></video></div>';
    //jest.spyOn(FilterEvent.prototype, 'prepareFilter').mockImplementation();
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
    //jest.spyOn(FilterEvent.prototype, 'prepareFilter').mockRestore();
  });

  test('正常確認', async () => {
    // exe
    // confirmJsonの生成)
    const movieURL = 'testURL';
    const height = '320';
    const width = '180';
    const bannerText = 'this is the test';
    const btnText = 'test button';
    const videoFrameUrl = 'http://localhost:3000/imp';
    const entryFrameUrl = 'entryFrameUrl';
    const impressionUrl = 'impressionUrl';
    const confirmJson = new Jsontype(
      movieURL,
      bannerText,
      'test',
      height,
      width,
      '0',
      btnText,
      '',
      videoFrameUrl,
      entryFrameUrl,
      impressionUrl
    );
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;


    let cntEvt = window.setInterval(() => 'sample');

    // ck
    EventViewThrough.viewThroughAction(cntEvt, confirmJson, videoElement);
    const resultElement = document.getElementsByName('iframe');
    expect(resultElement[0].getAttribute('iframeborder')).toEqual('0');
    expect(resultElement[0].getAttribute('data-emergence')).toEqual('hidden');
    expect(resultElement[0].getAttribute('width')).toEqual('0');
    expect(resultElement[0].getAttribute('height')).toEqual('0');
    expect(resultElement[0].getAttribute('src')).toEqual('entryFrameUrl?url=test');
    expect(resultElement[0].getAttribute('style')).toEqual('border: 1px solid gray; display: none;');
  });
});

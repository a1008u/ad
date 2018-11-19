import { ImpService } from '../../../../../src/videoad/atvad/ts/service/ImpService';
import { Jsontype } from '../../../../../src/videoad/service/class/jsontype';

describe('impアクセスの確認', () => {

  beforeEach(() => {
    document.body.innerHTML = '<video id="atvVideo" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" ___filter="off" width="640"></video>';
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
  });

  test('pause機能の確認', async () => {

    // prepare(jsonの生成)
    const movieURL = 'testURL';
    const height = '640';
    const width = '360';
    const bannerText = 'this is the test';
    const btnText = 'test button';
    const videoFrameUrl = 'http://localhost:3000/imp';
    const entryFrameUrl = 'entryFrameUrl';
    const impressionUrl = 'impressionUrl';
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


    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    const resultData = await ImpService.execImp(videoElement, confirmJson);
    const result: string = videoElement.getAttribute('imp');

    // ck
    expect(result).toEqual('done');
  });
});

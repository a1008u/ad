import { VideoFilterEventFactory } from '../../../../../../src/videoad/atvad/ts/service/Factory/VideoFilterEventFactory';
import { Jsontype } from '../../../../../../src/videoad/service/class/jsontype';
import { FilterEvent } from '../../../../../../src/videoad/atvad/ts/service/Filter/FilterEvent';

describe('Eventのチェック', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = '<video id="atvVideo" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" ___filter="off" width="640"></video>';
    jest.spyOn(VideoFilterEventFactory, 'setClickOrTouchEvent').mockImplementation();
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
    jest.spyOn(VideoFilterEventFactory, 'setClickOrTouchEvent').mockRestore();
  });

  test('ios版の正常確認', async () => {
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
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;

    // ck
    VideoFilterEventFactory.osEvent['ios'](videoElement, confirmJson);
    expect(VideoFilterEventFactory.setClickOrTouchEvent).toHaveBeenCalled();

    VideoFilterEventFactory.osEvent['android'](videoElement, confirmJson);
    expect(VideoFilterEventFactory.setClickOrTouchEvent).toHaveBeenCalled();

    VideoFilterEventFactory.osEvent['windowsphone'](videoElement, confirmJson);
    expect(VideoFilterEventFactory.setClickOrTouchEvent).toHaveBeenCalled();

    VideoFilterEventFactory.osEvent['pc'](videoElement, confirmJson);
    expect(VideoFilterEventFactory.setClickOrTouchEvent).toHaveBeenCalled();
  });
});

describe('iosのチェック', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = '<video id="atvVideo" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" ___filter="off" width="640"></video>';
    jest.spyOn(FilterEvent.prototype, 'prepareFilter').mockImplementation();
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
    jest.spyOn(FilterEvent.prototype, 'prepareFilter').mockRestore();
  });

  test('チェックの正常確認', async () => {
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
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;

    // ck
    VideoFilterEventFactory.setClickOrTouchEvent(videoElement, confirmJson, 'click');
    videoElement.dispatchEvent(new Event('click'));
    expect(FilterEvent.prototype.prepareFilter).toHaveBeenCalled();
  });
});

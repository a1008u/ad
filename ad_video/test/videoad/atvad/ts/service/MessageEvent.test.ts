import { MessageEvent } from '../../../../../src/videoad/atvad/ts/service/MessageEvent';
import { VideoAction } from '../../../../../src/videoad/atvad/ts/service/video/videoAction';
import { Jsontype } from '../../../../../src/videoad/service/class/jsontype';
import { ImpService } from '../../../../../src/videoad/atvad/ts/service/ImpService';

describe('ckAndExeActionの確認', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = '<video id="atvVideo" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" ___filter="off" width="640"></video>';
    jest.spyOn(VideoAction, 'pauseAction').mockImplementation();
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
    jest.spyOn(VideoAction, 'pauseAction').mockRestore();
  });

  test('チェックの正常確認', async () => {
    // exe
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
    MessageEvent.ckAndExeAction('pause', videoElement, confirmJson);
    expect(VideoAction.pauseAction).toHaveBeenCalled();
  });

  test('正常（動画が再生中）', async () => {
    // exe
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
    MessageEvent.ckAndExeAction('play', videoElement, confirmJson);
    expect(VideoAction.pauseAction).not.toHaveBeenCalled();
  });
});

describe('ckAndExeActionの確認', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = '<video id="atvVideo" playxxx="pause" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" ___filter="off" width="640"></video>';
    jest.spyOn(VideoAction, 'pauseAction').mockImplementation();
    jest.spyOn(VideoAction, 'playAction').mockImplementation();
    jest.spyOn(ImpService, 'execImp').mockImplementation();
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
    jest.spyOn(VideoAction, 'pauseAction').mockRestore();
    jest.spyOn(VideoAction, 'playAction').mockRestore();
    jest.spyOn(ImpService, 'execImp').mockRestore();
  });

  test('正常（eventStatusがpause以外 -> 再生）', async () => {
    // exe
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
    MessageEvent.ckAndExeAction('play', videoElement, confirmJson);
    expect(VideoAction.pauseAction).not.toHaveBeenCalled();
    expect(VideoAction.playAction).toHaveBeenCalled();
    expect(ImpService.execImp).toHaveBeenCalled();
  });
});

describe('ckAndExeActionの確認', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = '<video id="atvVideo" playxxx="play" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" ___filter="off" width="640"></video>';
    jest.spyOn(VideoAction, 'pauseAction').mockImplementation();
    jest.spyOn(VideoAction, 'playAction').mockImplementation();
    jest.spyOn(ImpService, 'execImp').mockImplementation();
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
    jest.spyOn(VideoAction, 'pauseAction').mockRestore();
    jest.spyOn(VideoAction, 'playAction').mockRestore();
    jest.spyOn(ImpService, 'execImp').mockRestore();
  });

  test('正常（eventStatusがpause以外 -> 停止）', async () => {
    // exe
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
    MessageEvent.ckAndExeAction('play', videoElement, confirmJson);
    expect(VideoAction.pauseAction).toHaveBeenCalled();
    expect(VideoAction.playAction).not.toHaveBeenCalled();
    expect(ImpService.execImp).not.toHaveBeenCalled();
  });
});

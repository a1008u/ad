import { FilterEvent } from "../../../../../../src/videoad/atvad/ts/service/Filter/FilterEvent";
import { FilterPlayMode } from "../../../../../../src/videoad/atvad/ts/service/Filter/FilterPlayMode";
import { ImpService } from "../../../../../../src/videoad/atvad/ts/service/ImpService";
import { Jsontype } from "../../../../../../src/videoad/service/class/jsontype";


describe('videoStateChangeの確認(play -> pause状態に変更)', () => {

  beforeEach(() => {
    document.body.innerHTML = '<video playxxx="play" id="atvVideo" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" ___filter="off" width="640"></video>';
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
  });

  test('play時の動作', async () => {
    // exe;
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    const filterEvent: FilterEvent = new FilterEvent();
    await filterEvent.videoStateChange(videoElement);

    // ck
    const resultVideoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    expect(resultVideoElement.getAttribute('playxxx')).toEqual('pause');
  });
});

describe('videoStateChangeの確認(pause -> play状態に変更)', () => {

  beforeEach(() => {
    document.body.innerHTML = '<video playxxx="pause" id="atvVideo" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" ___filter="off" width="640"></video>';
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
  });

  test('pause時の動作', async () => {
    // exe;
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    const filterEvent: FilterEvent = new FilterEvent();
    await filterEvent.videoStateChange(videoElement);

    // ck
    const resultVideoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    expect(resultVideoElement.getAttribute('playxxx')).toEqual('play');

  });
});

describe('videoStateChangeの確認(playxxxが存在しない動作)', () => {

  beforeEach(() => {
    document.body.innerHTML = '<video id="atvVideo" videoStart playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" ___filter="off" width="640"></video>';
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
  });

  test('初回起動の動作', async () => {
    // exe;
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    const filterEvent: FilterEvent = new FilterEvent();
    await filterEvent.videoStateChange(videoElement);

    // ck
    const resultVideoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    expect(resultVideoElement.getAttribute('playxxx')).toEqual('play');
    expect(resultVideoElement.getAttribute('videoStart')).toBeNull();

  });
});

describe('showFilterの確認', () => {

  beforeEach(() => {
    document.body.innerHTML = `
    <div id="test">
      <video playxxx="play" id="atvVideo" playsinline="playsinline" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" width="640"></video>
    </div>`;
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
  });

  test('正常確認', async () => {
    // mock
    jest.mock('../../../../../../src/videoad/atvad/ts/service/Filter/FilterEvent');
    FilterPlayMode.prototype.execFil = jest.fn().mockImplementation(() => {
      let tDom = document.createElement('div');
      tDom.setAttribute('id', 'filter');
      tDom.setAttribute('testkey', 'filter');
      return tDom;
    })

    // exe;
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    const filterEvent: FilterEvent = new FilterEvent();
    await filterEvent.showFilter(videoElement);

    // ck
    const resultDivElement: HTMLDivElement = document.getElementById('test') as HTMLDivElement;
    const resultDivFilterElement: HTMLDivElement = document.getElementById('filter') as HTMLDivElement;
    expect(resultDivFilterElement.getAttribute('testkey')).toEqual('filter');
  });
});

describe('prepareFilterの確認', () => {

  beforeEach(() => {
    document.body.innerHTML = `
    <div id="test">
      <video playxxx="play" id="atvVideo" playsinline="playsinline" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" width="640"></video>
    </div>`;

    // mock
    jest.spyOn(FilterEvent.prototype, 'videoStateChange').mockImplementation();
    jest.spyOn(FilterEvent.prototype, 'showFilter').mockImplementation();
    jest.spyOn(ImpService, 'execImp').mockImplementation();
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);

    jest.spyOn(FilterEvent.prototype, 'videoStateChange').mockRestore();
    jest.spyOn(FilterEvent.prototype, 'showFilter').mockRestore();
    jest.spyOn(ImpService, 'execImp').mockRestore();
  });

  test('正常確認', async () => {
    

    // exe;
    const movieURL = 'testURL';
    const height = '640';
    const width = '360';
    const bannerText = 'this is the test';
    const btnText = 'test button';
    const videoFrameUrl = 'http://localhost:3000/imp';
    const entryFrameUrl = 'entryFrameUrl';
    const impressionUrl = 'impressionUrl';
    const atvjson = new Jsontype(
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
    const filterEvent: FilterEvent = new FilterEvent();
    await filterEvent.prepareFilter(videoElement, atvjson);

    // ck
    expect(FilterEvent.prototype.videoStateChange).toHaveBeenCalled();
    expect(FilterEvent.prototype.showFilter).toHaveBeenCalled();
    expect(ImpService.execImp).toHaveBeenCalled();
  });
});
import { FilterEvent } from "../../../../../../src/videoad/atvad/ts/service/Filter/FilterEvent";


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

describe('s
howFilterの確認(play -> pause状態に変更)', () => {

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
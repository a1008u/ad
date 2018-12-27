import { VideoAction } from '../../../../../../src/vat/atvad/ts/service/video/videoAction';

describe('MessageEventの確認', () => {

  beforeEach(() => {
    document.body.innerHTML = '<video id="atvVideo" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/vat/atvad/mp4/ba1.mp4" loop="true" imp="done" ___filter="off" width="640"></video>';
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
  });

  test('pause機能の確認', async () => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    await VideoAction.pauseAction(videoElement);
    const result: string = videoElement.getAttribute('playxxx');

    // ck
    expect(result).toEqual('pause');
  });

  test('play機能の確認', async () => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    await VideoAction.playAction(videoElement);
    const result: string = videoElement.getAttribute('playxxx');

    // ck
    expect(result).toEqual('play');
  });
});

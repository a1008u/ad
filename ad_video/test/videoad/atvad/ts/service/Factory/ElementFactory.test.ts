import { Jsontype } from "../../../../../../src/videoad/service/class/jsontype";
import { ElementFactory } from "../../../../../../src/videoad/atvad/ts/service/Factory/ElementFactory";

describe('mkViewThroughVideoElementのチェック', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = '<div id="atvMain"><video id="atvVideo"></video></div>';
    //jest.spyOn(VideoFilterEventFactory, 'setClickOrTouchEvent').mockImplementation();
  });

  afterEach(() => {
    // exe
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    $mainDivElement.parentNode.removeChild($mainDivElement);
    //jest.spyOn(VideoFilterEventFactory, 'setClickOrTouchEvent').mockRestore();
  });

  test('viewthrough(プレビュー)の正常確認', async () => {
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
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');

    // ck <video id="atvVideo" loop="true" src="testURL" videostart="start" width="180" />
    const $videoElement = ElementFactory.mkViewThroughVideoElement($mainDivElement,confirmJson,'true')
    expect($videoElement.getAttribute('loop')).toEqual('true');
  });
});

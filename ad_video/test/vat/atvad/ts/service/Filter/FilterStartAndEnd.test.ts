import { FilterStartAndEnd } from '../../../../../../src/vat/atvad/ts/service/Filter/FilterStartAndEnd';
import { Filter } from '../../../../../../src/vat/atvad/ts/service/Filter/Filter';
import { Jsontype } from '../../../../../../src/vat/service/class/jsontype';

describe('execFilnotAnimationの確認', () => {

  beforeEach(() => {
    document.body.innerHTML = `
    <div id="test">
      <video playxxx="play" id="atvVideo" playsinline="playsinline"
        muted="" src="http://localhost:3000/vat/atvad/mp4/ba1.mp4" width="640"></video>
    </div>`;

    // spyの設定
    jest.spyOn(Filter.prototype, 'mkFilterElement').mockImplementation(() => {
      let tDom1: HTMLDivElement = document.createElement('div');
      let tDom2: HTMLDivElement = document.createElement('div');
      let tDom: HTMLDivElement = document.createElement('div');
      tDom.setAttribute('id', 'filter');
      tDom.setAttribute('testkey', 'filter');
      tDom1.appendChild(tDom2);
      tDom.appendChild(tDom1);
      return tDom;
    });
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);

    // spyの削除
    jest.spyOn(Filter.prototype, 'mkFilterElement').mockRestore();
  });

  test('正常確認', async () => {
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
    // exe;
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    const filterEnd: FilterStartAndEnd = new FilterStartAndEnd();
    const divElementFilter = await filterEnd.execFilnotAnimation(
      videoElement,
      confirmJson,
      'play'
    );

    /**
     * ck
     * <div id="filter" testkey="filter">
     *  <div>
     *    <div style="width:0px; height:0px; pointer-events: none;" />
     *  </div>
     * </div>
     */
    expect(divElementFilter.firstElementChild.firstElementChild.getAttribute('style')).toEqual('width:90px; height:160px; pointer-events: none;');
  });
});


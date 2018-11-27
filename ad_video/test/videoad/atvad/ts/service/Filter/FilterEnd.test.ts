import { FilterEnd } from '../../../../../../src/videoad/atvad/ts/service/Filter/FilterEnd';
import { Filter } from '../../../../../../src/videoad/atvad/ts/service/Filter/Filter';

describe('execFilnotAnimationの確認', () => {

  beforeEach(() => {
    document.body.innerHTML = `
    <div id="test">
      <video playxxx="play" id="atvVideo" playsinline="playsinline"
        muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" width="640"></video>
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

    // exe;
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    const filterEnd: FilterEnd = new FilterEnd();
    const divElementFilter = await filterEnd.execFilnotAnimation(videoElement, 'play');

    /**
     * ck
     * <div id="filter" testkey="filter">
     *  <div>
     *    <div style="width:0px; height:0px; pointer-events: none;" />
     *  </div>
     * </div>
     */
    expect(divElementFilter.firstElementChild.firstElementChild.getAttribute('style')).toEqual('width:0px; height:0px; pointer-events: none;');
  });
});


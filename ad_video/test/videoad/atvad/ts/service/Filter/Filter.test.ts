import { Filter } from "../../../../../../src/videoad/atvad/ts/service/Filter/Filter";

describe('deleteMethodの確認', () => {

  beforeEach(() => {
    document.body.innerHTML = '<div id="atvMain" class="atvMain __mainDivShadow __aparent" style="width:640px; z-index:30;"><video id="atvVideo" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" width="640"></video><div id="__filter" class="__filter" style="width:640px; height:360px; padding: 90px; cursor:pointer; z-index:30; box-sizing:border-box;"><object id="___obj" style="width:320px; height:180px; pointer-events: none;" ___text="play"><svg id="___play" aria-hidden="true" data-prefix="fas" data-icon="play-circle" class="svg-inline--fa fa-play-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width:320px; height:180px; pointer-events: none;"><path fill="White" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path></svg></object></div></div>';
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
  });

  test('pause時の動作', async () => {
    // exe;
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    const divElementFilter: HTMLDivElement = document.getElementById('__filter') as HTMLDivElement;
    const filter: Filter = new Filter();
    await filter.deleteMethod(videoElement, 'pause', divElementFilter);

    // ck
    const resultPlayMode: string = videoElement.getAttribute('playxxx');
    expect(resultPlayMode).toEqual('play');
    const FilterState: string = videoElement.getAttribute('___filter');
    expect(FilterState).toEqual('off');

    const resultFilterDom = document.getElementById('__filter');
    expect(resultFilterDom).toBeNull();

  });

  test('pause以外の動作', async () => {
    // exe;
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    const divElementFilter: HTMLDivElement = document.getElementById('__filter') as HTMLDivElement;
    const filter: Filter = new Filter();
    await filter.deleteMethod(videoElement, 'play', divElementFilter);

    // ck
    const resultPlayMode: string = videoElement.getAttribute('playxxx');
    expect(resultPlayMode).toEqual('pause');
    const FilterState: string = videoElement.getAttribute('___filter');
    expect(FilterState).toEqual('off');

    const resultFilterDom = document.getElementById('__filter');
    expect(resultFilterDom).toBeNull();

  });
});

describe('getFilterの確認', () => {

  beforeEach(() => {
    document.body.innerHTML = '<video id="atvVideo" playsinline="playsinline" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true"></video>';
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
  });

  test('filter用のdiv確認', async () => {
    // exe;
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    const filter: Filter = new Filter();
    const resultFilter = await filter.getFilter(videoElement);

    // ck
    const classValue = resultFilter.getAttribute('class');
    expect(classValue).toEqual('__filter');

    // width:0px; height:0px; padding: 0px; cursor:pointer; z-index:30; box-sizing:border-box;
    const styleValue = resultFilter.getAttribute('style');
    expect(styleValue).toEqual('width:0px; height:0px; padding: 0px; cursor:pointer; z-index:30; box-sizing:border-box;');
  });
});

describe('getSvgObjElmentの確認', () => {

  test('pause用のマーク取得', async () => {
    // exe;
    const filter: Filter = new Filter();
    const pauseMark = await filter.getSvgObjElment('pause');

    // ck
    expect(pauseMark.config.url).toEqual('../../atvad/svg/play-circle-solid.svg');
  });

  test('play用のマーク取得', async () => {
    // exe;
    const filter: Filter = new Filter();
    const playMark = await filter.getSvgObjElment('play');

    // ck
    expect(playMark.config.url).toEqual('../../atvad/svg/pause-circle-solid.svg');
  });
});


describe('mkObjElementの確認', () => {

  beforeEach(() => {
    document.body.innerHTML = '<div id="atvMain" class="atvMain __mainDivShadow __aparent" style="width:640px; z-index:30;"><video id="atvVideo" playsinline="playsinline" style="cursor:pointer;" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" loop="true" width="640"></video><div id="__filter" class="__filter" style="width:640px; height:360px; padding: 90px; cursor:pointer; z-index:30; box-sizing:border-box;"><object id="___obj" style="width:320px; height:180px; pointer-events: none;" ___text="play"><svg id="___play" aria-hidden="true" data-prefix="fas" data-icon="play-circle" class="svg-inline--fa fa-play-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width:320px; height:180px; pointer-events: none;"><path fill="White" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path></svg></object></div></div>';
  });

  afterEach(() => {
    // exe
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    videoElement.parentNode.removeChild(videoElement);
  });

  test('動画(pause時) => play用のマーク表示(マーク後動画は再生)', async () => {

    const playSvg: any = document.getElementById('___play');
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;

    // exe;
    const filter: Filter = new Filter();
    const objElement: HTMLObjectElement = await filter.mkObjElement(playSvg, videoElement, 'pause');

    // ck
    expect(objElement.getAttribute('id')).toEqual('___obj');
    expect(objElement.getAttribute('style')).toEqual('width:0px; height:0px; pointer-events: none;');
    expect(objElement.getAttribute('___text')).toEqual('play');
  });

  test('動画(play時) => pause用のマーク表示(マーク後動画は停止))', async () => {

    const playSvg: any = document.getElementById('___play');
    const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;

    // exe;
    const filter: Filter = new Filter();
    const objElement: HTMLObjectElement = await filter.mkObjElement(playSvg, videoElement, 'play');

    // ck
    expect(objElement.getAttribute('id')).toEqual('___obj');
    expect(objElement.getAttribute('style')).toEqual('width:0px; height:0px; pointer-events: none;');
    expect(objElement.getAttribute('___text')).toEqual('pause');
  });
});

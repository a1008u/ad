import { Jsontype } from "../../../../../../src/videoad/service/class/jsontype";
import { ElementFactory } from "../../../../../../src/videoad/atvad/ts/service/Factory/ElementFactory";

describe('mkViewThroughVideoElementのチェック', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = '<div id="atvMain"><video id="atvVideo"></video></div>';
  });

  afterEach(() => {
    // exe
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    $mainDivElement.parentNode.removeChild($mainDivElement);
  });

  test('viewthrough(非プレビュー)の正常確認', async () => {
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

    const $videoElement = ElementFactory.mkViewThroughVideoElement($mainDivElement,confirmJson)
    expect($videoElement.getAttribute('loop')).toEqual('loop');
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
    confirmJson.ATV_MODE = 'preview';
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');

    // ck <video id="atvVideo" loop="false" src="testURL" videostart="start" width="180" atv_mode="preview"/>
    const $videoElement = ElementFactory.mkViewThroughVideoElement($mainDivElement,confirmJson)
    expect($videoElement.getAttribute('loop')).toEqual('loop');
    expect($videoElement.getAttribute('atv_mode')).toEqual('preview');
  });
  
  test('広告エリアの確認(pc)', async () => {
    // exe
    // confirmJsonの生成)
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
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    ElementFactory.mkAdArea(confirmJson, $mainDivElement);

    // ck
    expect($mainDivElement.querySelector('.__divTextLeftElement').getAttribute('style')).toEqual('font-size:22px');
    expect($mainDivElement.querySelector('.__atv_button').getAttribute('style')).toEqual('font-size:20px; padding:10px 20px');
  });

  test('広告エリアの確認(pc)', async () => {
    // exe
    // confirmJsonの生成)
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
    confirmJson.ATV_MODE = 'previewSpAdarea';
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    ElementFactory.mkAdArea(confirmJson, $mainDivElement);

    // ck
    expect($mainDivElement.querySelector('.__divTextLeftElement').getAttribute('style')).toEqual('font-size:16px');
    expect($mainDivElement.querySelector('.__atv_button').getAttribute('style')).toEqual('font-size:12px; padding:5px 10px');
  });

  test('非viewthrough(PCプレビュー)の正常確認', async () => {
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
    confirmJson.ATV_MODE = 'previewPcAdarea';
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    const $videoElement = ElementFactory.mkNotViewThroughVideoElement($mainDivElement,confirmJson)

    // ck
    expect($videoElement.getAttribute('loop')).toBeNull();
    expect($mainDivElement.querySelector('.__divTextLeftElement').getAttribute('style')).toEqual('font-size:22px');
    expect($mainDivElement.querySelector('.__atv_button').getAttribute('style')).toEqual('font-size:20px; padding:10px 20px');
  });

  test('非viewthrough(PCプレビュー)の正常確認', async () => {
    // exe
    // confirmJsonの生成)
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
    confirmJson.ATV_MODE = 'previewPcAdarea';
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    ElementFactory.mkElement(confirmJson);

    // ck
    expect($mainDivElement.getAttribute('style')).toEqual('width:360px; z-index:30;');
    expect($mainDivElement.querySelector('.__divTextLeftElement').getAttribute('style')).toEqual('font-size:22px');
    expect($mainDivElement.querySelector('.__atv_button').getAttribute('style')).toEqual('font-size:20px; padding:10px 20px');
  });

  test('viewthrough(PC)の正常確認', async () => {
    // exe
    // confirmJsonの生成)
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
      '5',
      btnText,
      '',
      videoFrameUrl,
      entryFrameUrl,
      impressionUrl
    );
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    ElementFactory.mkElement(confirmJson);

    // ck
    expect($mainDivElement.getAttribute('style')).toEqual('width:360px; z-index:30;');
    expect($mainDivElement.querySelector('.__divTextLeftElement')).toBeNull();
    expect($mainDivElement.querySelector('.__atv_button')).toBeNull();
  });
});

import { Jsontype} from '../../../src/vat/service/class/jsontype';
import { IframePreview } from '../../../src/atvad/ts/IframePreview';

const iframepreview = new IframePreview();
const apiDomain: string = 'http://localhost:3000';
const htmlDomain: string = 'http://localhost:3000';
const scriptElement = '';
const empty = '';

describe('mkIframeViaServerのテスト', () => {
  test('正常_notviewthrough_sp', async () => {
    const rkValue = '010011a1';
    const result: Jsontype = await (iframepreview as any).mkIframePreViaServer(apiDomain, scriptElement, rkValue);
    expect(result.rk).toEqual(rkValue);
    expect(result.impression_url).toEqual(empty);
    expect(result.ATV_MODE).toEqual('previewSp');
    expect(result.ADAREA_HEIGHT).toEqual('0');
  });

  test('正常_notviewthrough_pc', async () => {
    const rkValue = '010011a1_pc';
    const result: Jsontype = await (iframepreview as any).mkIframePreViaServer(apiDomain, scriptElement, rkValue);
    expect(result.rk).toEqual(rkValue);
    expect(result.impression_url).toEqual(empty);
    expect(result.ATV_MODE).toEqual('previewPc');
    expect(result.ADAREA_HEIGHT).toEqual('0');
  });

  test('正常_viewthrough_pc', async () => {
    const rkValue = '010011a8_pc';
    const result: Jsontype = await (iframepreview as any).mkIframePreViaServer(apiDomain, scriptElement, rkValue);
    expect(result.rk).toEqual(rkValue);
    expect(result.impression_url).toEqual(empty);
    expect(result.ATV_MODE).toEqual('previewPcAdarea');
    expect(result.ADAREA_HEIGHT).toEqual('80');
  });

  test('正常_viewthrough_sp', async () => {
    const rkValue = '010011a8';
    const result: Jsontype = await (iframepreview as any).mkIframePreViaServer(apiDomain, scriptElement, rkValue);
    expect(result.rk).toEqual(rkValue);
    expect(result.impression_url).toEqual(empty);
    expect(result.ATV_MODE).toEqual('previewSpAdarea');
    expect(result.ADAREA_HEIGHT).toEqual('50');
  });
});

// --------------------------------------------

describe('mkIframePreViaNodeのテスト1', () => {

  const dataAtvUrl = 'http://s.intra.accesstrade.net/mv/tu.mp4';
  const dataAtvBannerText = 'サンプルテキスト';
  const dataAtvBtnText = 'サンプルボタン';
  const dataAtvHeight = '180';
  const dataAtvWidth = '360';

  beforeEach(() => {
    document.body.innerHTML = `<script async id="test" src="../atvad_min.js" data-atv-mode="preview" data-atv-url=${dataAtvUrl} data-atv-banner-text=${dataAtvBannerText} data-atv-btn-text=${dataAtvBtnText} data-atv-height=${dataAtvHeight} data-atv-width=${dataAtvWidth}></script>`;
    jest.setTimeout(30000);
  });

  afterEach(() => {
    let element = document.getElementById('test');
    element.parentNode.removeChild(element);
  });

  test('正常_notviewthrough_sp', async () => {
    const rkValue = '010011a1';
    const scriptElement = document.getElementById('test');
    const result: Jsontype = await (iframepreview as any).mkIframePreViaNode(apiDomain, scriptElement, rkValue);
    expect(result.rk).toEqual(empty);
    expect(result.image_url).toEqual(dataAtvUrl);
    expect(result.banner_text).toEqual(dataAtvBannerText);
    expect(result.video_btn_text).toEqual(dataAtvBtnText);
    expect(result.height).toEqual(dataAtvHeight);
    expect(result.width).toEqual(dataAtvWidth);

    expect(result.ATV_MODE).toEqual('previewSpAdarea');
    expect(result.ADAREA_HEIGHT).toEqual('50');
  });

});

describe('mkIframePreViaNodeのテスト2', () => {

  const dataAtvUrl = 'http://s.intra.accesstrade.net/mv/tu.mp4';
  const dataAtvBannerText = '';
  const dataAtvBtnText = '';
  const dataAtvHeight = '180';
  const dataAtvWidth = '360';

  beforeEach(() => {
    document.body.innerHTML = `<script async id="test" src="../atvad_min.js" data-atv-mode="preview" data-atv-url=${dataAtvUrl} data-atv-banner-text="${dataAtvBannerText}" data-atv-btn-text="${dataAtvBtnText}" data-atv-height="${dataAtvHeight}" data-atv-width="${dataAtvWidth}"></script>`;
    jest.setTimeout(30000);
  });

  afterEach(() => {
    let element = document.getElementById('test');
    element.parentNode.removeChild(element);
  });

  test('正常_viewthrough_sp', async () => {
    const rkValue = '010011a8';
    const scriptElement = document.getElementById('test');
    const result: Jsontype = await (iframepreview as any).mkIframePreViaNode(apiDomain, scriptElement, rkValue);
    expect(result.rk).toEqual(empty);
    expect(result.image_url).toEqual(dataAtvUrl);
    expect(result.banner_text).toEqual(dataAtvBannerText);
    expect(result.video_btn_text).toEqual(dataAtvBtnText);
    expect(result.height).toEqual(dataAtvHeight);
    expect(result.width).toEqual(dataAtvWidth);

    expect(result.ATV_MODE).toEqual('previewSp');
    expect(result.ADAREA_HEIGHT).toEqual('0');
    expect(result.videoad_vt_second).toEqual('1');
  });

});

describe('mkIframePreViaNodeのテスト3', () => {

  const dataAtvUrl = 'http://s.intra.accesstrade.net/mv/tu.mp4';
  const dataAtvBannerText = 'サンプルテキスト';
  const dataAtvBtnText = 'サンプルボタン';
  const dataAtvHeight = '360';
  const dataAtvWidth = '640';

  beforeEach(() => {
    document.body.innerHTML = `<script async id="test" src="../atvad_min.js" data-atv-mode="preview" data-atv-url=${dataAtvUrl} data-atv-banner-text=${dataAtvBannerText} data-atv-btn-text=${dataAtvBtnText} data-atv-height=${dataAtvHeight} data-atv-width=${dataAtvWidth}></script>`;
    jest.setTimeout(30000);
  });

  afterEach(() => {
    let element = document.getElementById('test');
    element.parentNode.removeChild(element);
  });

  test('正常_notviewthrough_pc', async () => {
    const rkValue = '010011a1_pc';
    const scriptElement = document.getElementById('test');
    const result: Jsontype = await (iframepreview as any).mkIframePreViaNode(apiDomain, scriptElement, rkValue);
    expect(result.rk).toEqual(empty);
    expect(result.image_url).toEqual(dataAtvUrl);
    expect(result.banner_text).toEqual(dataAtvBannerText);
    expect(result.video_btn_text).toEqual(dataAtvBtnText);
    expect(result.height).toEqual(dataAtvHeight);
    expect(result.width).toEqual(dataAtvWidth);

    expect(result.ATV_MODE).toEqual('previewPcAdarea');
    expect(result.ADAREA_HEIGHT).toEqual('80');
  });

});

describe('mkIframePreViaNodeのテスト4', () => {

  const dataAtvUrl = 'http://s.intra.accesstrade.net/mv/tu.mp4';
  const dataAtvBannerText = '';
  const dataAtvBtnText = '';
  const dataAtvHeight = '360';
  const dataAtvWidth = '640';

  beforeEach(() => {
    document.body.innerHTML = `<script async id="test" src="../atvad_min.js" data-atv-mode="preview" data-atv-url=${dataAtvUrl} data-atv-banner-text="${dataAtvBannerText}" data-atv-btn-text="${dataAtvBtnText}" data-atv-height="${dataAtvHeight}" data-atv-width="${dataAtvWidth}"></script>`;
    jest.setTimeout(30000);
  });

  afterEach(() => {
    let element = document.getElementById('test');
    element.parentNode.removeChild(element);
  });

  test('正常_viewthrough_pc', async () => {
    const rkValue = '010011a8_pc';
    const scriptElement = document.getElementById('test');
    const result: Jsontype = await (iframepreview as any).mkIframePreViaNode(apiDomain, scriptElement, rkValue);
    expect(result.rk).toEqual(empty);
    expect(result.image_url).toEqual(dataAtvUrl);
    expect(result.banner_text).toEqual(dataAtvBannerText);
    expect(result.video_btn_text).toEqual(dataAtvBtnText);
    expect(result.height).toEqual(dataAtvHeight);
    expect(result.width).toEqual(dataAtvWidth);

    expect(result.ATV_MODE).toEqual('previewPc');
    expect(result.ADAREA_HEIGHT).toEqual('0');
    expect(result.videoad_vt_second).toEqual('1');
  });

});

describe('mkIframeのテスト', () => {

  const dataAtvUrl = 'http://s.intra.accesstrade.net/mv/tu.mp4';
  const dataAtvBannerText = 'サンプルテキスト';
  const dataAtvBtnText = 'サンプルボタン';
  const dataAtvHeight = '180';
  const dataAtvWidth = '360';

  beforeEach(() => {
    document.body.innerHTML = `<script async id="test" src="../atvad_min.js" data-atv-mode="preview" data-atv-url=${dataAtvUrl} data-atv-banner-text="${dataAtvBannerText}" data-atv-btn-text="${dataAtvBtnText}" data-atv-height="${dataAtvHeight}" data-atv-width="${dataAtvWidth}"></script>`;
    jest.setTimeout(30000);
  });

  afterEach(() => {
    let element = document.getElementById('test');
    element.parentNode.removeChild(element);

    let iframeElement = document.getElementsByName('iframe');
    iframeElement[0].parentNode.removeChild(iframeElement[0]);
  });

  test('正常_viewthrough_pc', async () => {
    const rkValue = '010011a1';
    const scriptElement = document.getElementById('test');
    const result: Jsontype = await (iframepreview as any).mkIframe(apiDomain, htmlDomain, scriptElement, rkValue, (iframepreview as any).mkIframePreViaNode);

    const resultIframeElement = document.getElementsByName('iframe');
    expect((resultIframeElement[0] as HTMLIFrameElement).name).toEqual('iframe');
  });
});

describe('mainExecPreviewのテスト', () => {

  const dataAtvUrl = 'http://s.intra.accesstrade.net/mv/tu.mp4';
  const dataAtvBannerText = 'サンプルテキスト';
  const dataAtvBtnText = 'サンプルボタン';
  const dataAtvHeight = '180';
  const dataAtvWidth = '360';

  beforeEach(() => {
    jest.setTimeout(30000);
  });

  test('正常_notviewthrough_pc', async () => {

    document.body.innerHTML = `<script async id="testnotviewthrough" src="../atvad_min.js" data-atv-mode="preview" data-atv-url=${dataAtvUrl} data-atv-banner-text="${dataAtvBannerText}" data-atv-btn-text="${dataAtvBtnText}" data-atv-height="${dataAtvHeight}" data-atv-width="${dataAtvWidth}"></script>`;


    // spiの設定
    const em = require('../../../src/atvad/ts/EmergenceFactory');
    const spy = jest.spyOn(em, 'emergenceInit').mockImplementation();

    const rkValue = null;
    const scriptElement = document.getElementById('testnotviewthrough');
    await iframepreview.mainExecPreview(scriptElement, rkValue, apiDomain, htmlDomain);

    const resultIframeElement = document.getElementsByName('iframe');
    expect((resultIframeElement[0] as HTMLIFrameElement).name).toEqual('iframe');
    expect(spy).toHaveBeenCalled();

    scriptElement.parentNode.removeChild(scriptElement);
    resultIframeElement[0].parentNode.removeChild(resultIframeElement[0]);
  });

  test('正常_viewthrough_pc', async () => {

    document.body.innerHTML = `<script async id="testviewthrough" data-atv-rk="010011a1" data-atv-mode data-atv-mock="http://localhost:3000""></script>`;

    // spiの設定
    const em = require('../../../src/atvad/ts/EmergenceFactory')
    const spy = jest.spyOn(em, 'emergenceInit').mockImplementation();

    const rkValue = '010011a1';
    const scriptElement = document.getElementById('testviewthrough');
    await iframepreview.mainExecPreview(scriptElement, rkValue, apiDomain, htmlDomain);

    const resultIframeElement = document.getElementsByName('iframe');
    expect((resultIframeElement[0] as HTMLIFrameElement).name).toEqual('iframe');
    expect(spy).toHaveBeenCalled();

    scriptElement.parentNode.removeChild(scriptElement);
    resultIframeElement[0].parentNode.removeChild(resultIframeElement[0]);
  });

});


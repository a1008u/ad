import { Jsontype} from '../../../src/videoad/service/jsontype';
import { Iframe } from '../../../src/atvad/ts/Iframe';

const iframe: Iframe = new Iframe();
const domain: string = 'http://localhost:3000';
const scriptElement = '';

describe('mkIframeViaServerのテスト', () => {
  test('正常_notviewthrough_pc', async () => {
    const rkValue = '010011a1';
    const result: Jsontype = await (iframe as any).mkIframeViaServer(domain, scriptElement, rkValue);
    expect(result.rk).toEqual(rkValue);
    expect(result.ADAREA_HEIGHT).toEqual('0');
  });

  test('正常_viewthrough_pc', async () => {
    const rkValue = '010011a8_pc';
    const result: Jsontype = await (iframe as any).mkIframeViaServer(domain, scriptElement, rkValue);
    expect(result.rk).toEqual(rkValue);
    expect(result.ADAREA_HEIGHT).toEqual('100');
  });

  test('正常_viewthrough_sp', async () => {
    const rkValue = '010011a8';
    const result: Jsontype = await (iframe as any).mkIframeViaServer(domain, scriptElement, rkValue);
    expect(result.rk).toEqual(rkValue);
    expect(result.ADAREA_HEIGHT).toEqual('50');
  });
});

describe('mkIframeのテスト', () => {
  beforeEach(() => {
    document.body.innerHTML = '<script id="mkIframeTest"></script>';
  });

  test('正常_notviewthrough_pc', async () => {
    // exe
    const rkValue = '010011a1';
    const testScriptElement = document.getElementById('mkIframeTest');
    await (iframe as any).mkIframe(domain, testScriptElement, rkValue, (iframe as any).mkIframeViaServer);

    // ck
    const resultIframeElement = document.getElementsByName('iframe');
    expect((resultIframeElement[0] as HTMLIFrameElement).name).toEqual('iframe');
  });
});

describe('mainExecのテスト', () => {
  beforeEach(() => {
    document.body.innerHTML = '<script id="mkIframeTest" data-atv-rk="010011a1" data-atv-mode data-atv-mock="http://localhost:3000"></script>';
  });

  test('正常_notviewthrough_pc', async () => {
    jest.setTimeout(30000);
    // exe
    const testScriptElement = document.getElementById('mkIframeTest');
    const rkValue = testScriptElement.getAttribute('data-atv-rk');
    testScriptElement.removeAttribute('data-atv-rk');
    const atvMock = testScriptElement.getAttribute('data-atv-mock');
    testScriptElement.removeAttribute('data-atv-mock');

    await iframe.mainExec(testScriptElement, rkValue, window, atvMock);

    // ck
    const resultIframeElement = document.getElementsByName('iframe');
    expect((resultIframeElement[0] as HTMLIFrameElement).name).toEqual('iframe');
  });
});

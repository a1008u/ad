import { Jsontype } from '../../../src/vat/service/class/jsontype';
import { IframePreview } from '../../../src/atvad/ts/IframePreview';
import { Iframe } from '../../../src/atvad/ts/Iframe';
import { Main } from '../../../src/atvad/ts/main';

const domain: string = 'http://localhost:3000';

describe('非プレビュー用(プロダクション)(モック)', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = `<script async id='mexec' data-atv-mock="true" data-atv-rk="010011a1_pc" ></script>`;
    jest.setTimeout(50000);
  });
  afterEach(() => {
    let element = document.getElementById('mexec');
    element.parentNode.removeChild(element);
    jest.spyOn(IframePreview.prototype, 'mainExecPreview').mockRestore();
    jest.spyOn(Iframe.prototype, 'mainExec').mockRestore();
  });
  test('正常', async () => {
    // spiの設定
    const spy1 = jest.spyOn(IframePreview.prototype, 'mainExecPreview').mockImplementation();
    const spy2 = jest.spyOn(Iframe.prototype, 'mainExec').mockImplementation();

    // exe
    let scriptElement: HTMLElement = document.getElementById('mexec');
    const main: Main = new Main();
    await main.exec(scriptElement as HTMLScriptElement, window);
    console.log(scriptElement.getAttribute('data-atv-rk'))

    // ck
    const resultIframeElement = document.getElementsByName('iframe');
    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});

describe('非プレビュー用(プロダクション)(非モック)', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = `<script async id='mexec' data-atv-rk="010011a1_pc" ></script>`;
    jest.setTimeout(50000);
  });
  afterEach(() => {
    let element = document.getElementById('mexec');
    element.parentNode.removeChild(element);
    jest.spyOn(IframePreview.prototype, 'mainExecPreview').mockRestore();
    jest.spyOn(Iframe.prototype, 'mainExec').mockRestore();
  });
  test('正常', async () => {
    // spiの設定
    const spy1 = jest.spyOn(IframePreview.prototype, 'mainExecPreview').mockImplementation();
    const spy2 = jest.spyOn(Iframe.prototype, 'mainExec').mockImplementation();

    // exe
    let scriptElement: HTMLElement = document.getElementById('mexec');
    const main: Main = new Main();
    await main.exec(scriptElement as HTMLScriptElement, window);
    console.log(scriptElement.getAttribute('data-atv-rk'))

    // ck
    const resultIframeElement = document.getElementsByName('iframe');
    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});

describe('プレビュー用（モック）', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = `<script async id='mexec' data-atv-mode="true" data-atv-mock="true" dadata-atv-rk="010011a1_pc" ></script>`;
    jest.setTimeout(50000);
  });
  afterEach(() => {
    let element = document.getElementById('mexec');
    element.parentNode.removeChild(element);
    jest.spyOn(IframePreview.prototype, 'mainExecPreview').mockRestore();
    jest.spyOn(Iframe.prototype, 'mainExec').mockRestore();
  });
  test('正常', async () => {
    // spiの設定
    const spy1 = jest.spyOn(IframePreview.prototype, 'mainExecPreview').mockImplementation();
    const spy2 = jest.spyOn(Iframe.prototype, 'mainExec').mockImplementation();

    // exe
    let scriptElement: HTMLElement = document.getElementById('mexec');
    const main: Main = new Main();
    await main.exec(scriptElement as HTMLScriptElement, window);
    console.log(scriptElement.getAttribute('data-atv-rk'))

    // ck
    const resultIframeElement = document.getElementsByName('iframe');
    expect(spy1).toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
  });
});

describe('プレビュー用（非モック）', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = `<script async id='mexec' data-atv-mode="true" dadata-atv-rk="010011a1_pc" ></script>`;
    jest.setTimeout(50000);
  });
  afterEach(() => {
    let element = document.getElementById('mexec');
    element.parentNode.removeChild(element);
    jest.spyOn(IframePreview.prototype, 'mainExecPreview').mockRestore();
    jest.spyOn(Iframe.prototype, 'mainExec').mockRestore();
  });
  test('正常', async () => {
    // spiの設定
    const spy1 = jest.spyOn(IframePreview.prototype, 'mainExecPreview').mockImplementation();
    const spy2 = jest.spyOn(Iframe.prototype, 'mainExec').mockImplementation();

    // exe
    let scriptElement: HTMLElement = document.getElementById('mexec');
    const main: Main = new Main();
    await main.exec(scriptElement as HTMLScriptElement, window);
    console.log(scriptElement.getAttribute('data-atv-rk'))

    // ck
    const resultIframeElement = document.getElementsByName('iframe');
    expect(spy1).toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
  });
});


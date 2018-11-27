import { Jsoncookie } from "../../../src/videoad/service/class/jsoncookie";
import { IframeCookie } from "../../../src/videoad/cookie/ts/IframeCookie";
import { cookies } from "../../../src/videoad/cookie/ts/cookies";
import { browser } from "../../../src/videoad/service/browser";

const domain = 'http://localhost:3000';
const jsoncookie: Jsoncookie = new Jsoncookie(
  `${domain}/atvad/html/lp.html`, // rurlです 利用 iframe_url + url= rurl
  'thanku0001',
  `${domain}/ts.jpg`,
  `/videoad/cookie`
);

const jsoncookieNotV3: Jsoncookie = new Jsoncookie(
  `${domain}/atvad/html/lp.html`, // rurlです 利用 iframe_url + url= rurl
  '',
  `${domain}/ts.jpg`,
  `/videoad/cookie`
);

// tslint:disable-next-line:only-arrow-functions
async function ckCookie() {
  /**
   * ck
   * <iframe data-emergence="hidden" height="0" iframeborder="0" name="iframe" src="http://localhost:3000/atvad/html/lp.html" 
   *          style="align-items: stretch; box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1); display: none;" width="0" />
   */
  const $iframeElement: HTMLIFrameElement = document.querySelector('iframe');
  expect($iframeElement.getAttribute('height')).toEqual('0');
  expect($iframeElement.getAttribute('height')).toEqual('0');
  expect($iframeElement.style.display).toEqual('none');
  expect($iframeElement.getAttribute('iframeborder')).toEqual('0');
  expect($iframeElement.getAttribute('src')).toEqual(jsoncookie.rurl);
}

async function ckCookieViaBrowser(targetBrowser: string) {
  jest.spyOn(browser, 'ck').mockReturnValue(targetBrowser);
  const iframeCookie: IframeCookie = new IframeCookie();
  await iframeCookie.exec();

  await ckCookie();
  expect(cookies.setItem).toHaveBeenCalled();
  jest.spyOn(browser, 'ck').mockRestore();
}

// tslint:disable-next-line:only-arrow-functions
async function ckImg() {
  // <img alt="test" height="0" src="http://localhost:3000/ts.jpg" width="0" />
  const $imgElement: HTMLImageElement = document.querySelector('img');
  expect($imgElement.getAttribute('alt')).toEqual('test');
  expect($imgElement.getAttribute('height')).toEqual('0');
  expect($imgElement.getAttribute('width')).toEqual('0');
  expect($imgElement.getAttribute('src')).toEqual(jsoncookie.imgurl);
}

// tslint:disable-next-line:only-arrow-functions
async function ckImgViaBrowser(targetBrowser: string) {
  jest.spyOn(browser, 'ck').mockReturnValue(targetBrowser);
  const iframeCookie: IframeCookie = new IframeCookie();
  await iframeCookie.exec();

  await ckImg();
  jest.spyOn(browser, 'ck').mockRestore();

}

describe('IframeCookieのチェック①', () => {
  beforeEach(() => {
    document.body.innerHTML = '<script id="test"></script><div id="atv"></div>>';
    jest.spyOn(cookies, 'setItem').mockImplementation();
    window.history.pushState({}, 'Test Title', '/test.html?url=http%3A%2F%2Flocalhost%3A3000%2Fcookie%3Frk%3D01005gtr000005');
  });

  afterEach(() => {
    const $testScriptElement: HTMLScriptElement = document.querySelector('#test');
    $testScriptElement.parentNode.removeChild($testScriptElement);
    jest.spyOn(cookies, 'setItem').mockRestore();
    window.history.pushState({}, 'Test Title', '/test.html');
  });

  test('imgTagの正常確認', async () => {
    const iframeCookie: IframeCookie = new IframeCookie();
    await (iframeCookie as any).execImgElement(jsoncookie);

    await ckImg();
  });

  test('cookieの正常確認', async () => {
    const iframeCookie: IframeCookie = new IframeCookie();
    await (iframeCookie as any).execCookie(jsoncookie);

    await ckCookie();
    expect(cookies.setItem).toHaveBeenCalled();
  });

  test('cookieの正常確認(v3がない場合)', async () => {
    const iframeCookie: IframeCookie = new IframeCookie();
    await (iframeCookie as any).execCookie(jsoncookieNotV3);

    await ckCookie();
    expect(cookies.setItem).not.toHaveBeenCalled();
  });
});


describe('IframeCookieのチェック②', () => {
  beforeEach(() => {
    document.body.innerHTML = '<script id="test"></script><div id="atv"></div>>';
    jest.spyOn(cookies, 'setItem').mockImplementation();
    window.history.pushState({}, 'Test Title', '/test.html?url=http%3A%2F%2Flocalhost%3A3000%2Fcookie%3Frk%3D01005gtr000005');
  });

  afterEach(() => {
    const $testScriptElement: HTMLScriptElement = document.querySelector('#test');
    $testScriptElement.parentNode.removeChild($testScriptElement);
    jest.spyOn(cookies, 'setItem').mockRestore();
    window.history.pushState({}, 'Test Title', '/test.html');
  });

  test('execの正常確認_対象はcookie', async () => {
    await ckCookieViaBrowser('firefox');
    await ckCookieViaBrowser('chrome');
    await ckCookieViaBrowser('opera');
    await ckCookieViaBrowser('safari');
    await ckCookieViaBrowser('itp_safari');
    await ckCookieViaBrowser('android_browser');
    await ckCookieViaBrowser('chrome_mobile');
  });

  test('execの正常確認_対象はimg', async () => {
    await ckImgViaBrowser('ie');
    await ckImgViaBrowser('edge');
  });

  test('execの正常確認_対象はunknown', async () => {
    jest.spyOn(browser, 'ck').mockReturnValue('unknown');
    const iframeCookie: IframeCookie = new IframeCookie();
    await iframeCookie.exec();

    expect(cookies.setItem).not.toHaveBeenCalled();
    jest.spyOn(browser, 'ck').mockRestore();

    const $iframeElement: HTMLIFrameElement = document.querySelector('iframe');
    expect($iframeElement).toBeNull();

    const $imgElement: HTMLImageElement = document.querySelector('img');
    expect($imgElement).toBeNull();
  });

});

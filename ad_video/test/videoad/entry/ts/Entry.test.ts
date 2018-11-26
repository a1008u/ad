import { Entry } from "../../../../src/videoad/entry/ts/entry";
import { Jsonentry } from "../../../../src/videoad/service/class/jsonentry";

const domain = 'http://localhost:3000';

describe('Entryのチェック', () => {

  beforeEach(() => {
    window.history.pushState({}, 'Test Title', '/test.html?url=http%3A%2F%2Flocalhost%3A3000%2Fclick%3Frk%3D010011a4_pc');
  });

  afterEach(() => {
    window.history.pushState({}, 'Test Title', '/test.html');
  });

  test('getJsonの正常確認', async () => {
    const entry: Entry = new Entry();
    const result: Jsonentry = await (entry as any).getJson();

    const jsonentry: Jsonentry = new Jsonentry(
      'true',
      'z4361737039', // n
      '01005gtr000005', // rk
      `${domain}/cookie?rk=01005gtr000005`, // rurlです 利用 iframe_url + url= rurl
      'f3a42d90657264333bb4880f59055aed',
      `${domain}/videoad/cookie/html/iframe_cookie.html` // iframe_url
    );

    // ck
    expect(result).not.toBeNull();
    expect(result).toEqual(jsonentry);
  });
});

describe('Entryのチェック', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="main"><div id="atv_cookie_space"></div></div>';
  });

  afterEach(() => {
    const $mainDivElement: HTMLDivElement = document.querySelector('#atv_cookie_space');
    $mainDivElement.parentNode.removeChild($mainDivElement);
  });

  test('getJsonの正常確認', async () => {

    const jsonentry: Jsonentry = new Jsonentry(
      'true',
      'z4361737039', // n
      '01005gtr000005', // rk
      `${domain}/cookie?rk=01005gtr000005`, // rurlです 利用 iframe_url + url= rurl
      'f3a42d90657264333bb4880f59055aed',
      `${domain}/videoad/cookie/html/iframe_cookie.html` // iframe_url
    );

    const entry: Entry = new Entry();
    await (entry as any).mkCookieIframe(jsonentry);

    /** ck
     * <div id="main">
     *  <iframe data-emergence="hidden" height="0" iframeborder="0" name="iframe"
     *    src="http://localhost:3000/videoad/cookie/html/iframe_cookie.html?url=http%3A%2F%2Flocalhost%3A3000%2Fcookie%3Frk%3D01005gtr000005"
     *    style="align-items: stretch; box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1); display: none;" width="0" />
     *  <div id="atv_cookie_space" />
     * </div>
     */
    const $mainDivElement: HTMLDivElement = document.querySelector('#main');
    expect($mainDivElement).not.toBeNull();
    expect($mainDivElement.querySelector('iframe').getAttribute('height')).toEqual('0');
    expect($mainDivElement.querySelector('iframe').getAttribute('iframeborder')).toEqual('0');
    expect($mainDivElement.querySelector('iframe').getAttribute('src')).toEqual(`http://localhost:3000/videoad/cookie/html/iframe_cookie.html?url=${encodeURIComponent(jsonentry.rurl)}`);
    expect($mainDivElement.querySelector('iframe').getAttribute('style')).toEqual('align-items: stretch; box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1); display: none;');
  });
});

describe('execのチェック', () => {

  beforeEach(() => {
    document.body.innerHTML = '<div id="main"><div id="atv_cookie_space"></div></div>';
    window.history.pushState({}, 'Test Title', '/test.html?url=http%3A%2F%2Flocalhost%3A3000%2Fclick%3Frk%3D010011a4_pc');
  });

  afterEach(() => {
    window.history.pushState({}, 'Test Title', '/test.html');
    const $mainDivElement: HTMLDivElement = document.querySelector('#atv_cookie_space');
    $mainDivElement.parentNode.removeChild($mainDivElement);
  });

  test('getJsonの正常確認', async () => {
    const entry: Entry = new Entry();
    await entry.exec();

    const jsonentry: Jsonentry = new Jsonentry(
      'true',
      'z4361737039', // n
      '01005gtr000005', // rk
      `${domain}/cookie?rk=01005gtr000005`, // rurlです 利用 iframe_url + url= rurl
      'f3a42d90657264333bb4880f59055aed',
      `${domain}/videoad/cookie/html/iframe_cookie.html` // iframe_url
    );

    // ck
    const $mainDivElement: HTMLDivElement = document.querySelector('#main');
    expect($mainDivElement.querySelector('iframe').getAttribute('height')).toEqual('0');
    expect($mainDivElement.querySelector('iframe').getAttribute('iframeborder')).toEqual('0');
    expect($mainDivElement.querySelector('iframe').getAttribute('src')).toEqual(`http://localhost:3000/videoad/cookie/html/iframe_cookie.html?url=${encodeURIComponent(jsonentry.rurl)}`);
    expect($mainDivElement.querySelector('iframe').getAttribute('style')).toEqual('align-items: stretch; box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1); display: none;');
  });
});



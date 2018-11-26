import { iframeAtvad } from "../../../../src/videoad/atvad/ts/iframeAtvad";
import { ElementFactory } from "../../../../src/videoad/atvad/ts/service/Factory/ElementFactory";

describe('iframeAtvadのチェック', () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = '<div id="atvMain"><video id="atvVideo"></video></div>';
    jest.spyOn(ElementFactory, 'mkElement').mockImplementation();
    window.history.pushState({}, 'Test Title', '/test.html?atvJson=%7B%22banner_text%22%3A%22%E3%81%93%E3%81%93%E3%81%AF%E8%A1%A8%E7%A4%BA%E3%81%97%E3%81%BE%E3%81%9B%E3%82%93%22%2C%22image_url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fvideoad%2Fatvad%2Fmp4%2Fba5.mp4%22%2C%22href_url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fclick%3Frk%3D010011a4_pc%22%2C%22video_btn_text%22%3A%22%E3%81%93%E3%81%93%E3%81%AF%E8%A1%A8%E7%A4%BA%E3%81%97%E3%81%BE%E3%81%9B%E3%82%93%22%2C%22videoad_vt_second%22%3A%2210%22%2C%22width%22%3A%22640%22%2C%22height%22%3A%22360%22%2C%22rk%22%3A%22010011a4_pc%22%2C%22videoframe_url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fvideoad%2Fatvad%2Fhtml%2Fiframe_atvad.html%22%2C%22entryframe_url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fvideoad%2Fentry%2Fhtml%2Fiframe_entry.html%22%2C%22impression_url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fimp%22%2C%22ATV_MODE%22%3A%22%22%2C%22ADAREA_HEIGHT%22%3A%220%22%7D');
  });

  afterEach(() => {
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    $mainDivElement.parentNode.removeChild($mainDivElement);
    jest.spyOn(ElementFactory, 'mkElement').mockRestore();
    window.history.pushState({}, 'Test Title', '/test.html');
  });

  test('mkVideoAd(viewthrough)の正常確認', async () => {
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    await iframeAtvad.mkVideoAd();

    // ck
    expect(location.search.substring(1)).not.toBeNull();
    expect(ElementFactory.mkElement).toHaveBeenCalled();
  });
});

describe('iframeAtvadのチェック',async () => {
  const rkValue = '010011a1';

  beforeEach(() => {
    document.body.innerHTML = '<div id="atvMain"><video id="atvVideo"></video></div>';
    jest.spyOn(ElementFactory, 'mkElement').mockImplementation();
    window.history.pushState({}, 'Test Title', '/test.html?testatvJson=%7B%22banner_text%22%3A%22FF15%20-%20%E6%96%B0%E4%BD%9C%20-%20%22%2C%22image_url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fvideoad%2Fatvad%2Fmp4%2Fba5.mp4%22%2C%22href_url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fclick%3Frk%3D010011a5_pc%22%2C%22video_btn_text%22%3A%22%E3%83%9C%E3%82%BF%E3%83%B3%22%2C%22videoad_vt_second%22%3A%220%22%2C%22width%22%3A%22640%22%2C%22height%22%3A%22360%22%2C%22rk%22%3A%22010011a5_pc%22%2C%22videoframe_url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fvideoad%2Fatvad%2Fhtml%2Fiframe_atvad.html%22%2C%22entryframe_url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fvideoad%2Fentry%2Fhtml%2Fiframe_entry.html%22%2C%22impression_url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fimp%22%2C%22ATV_MODE%22%3A%22%22%2C%22ADAREA_HEIGHT%22%3A%22100%22%7D');
  });

  afterEach(() => {
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    $mainDivElement.parentNode.removeChild($mainDivElement);
    jest.spyOn(ElementFactory, 'mkElement').mockRestore();
    window.history.pushState({}, 'Test Title', '/test.html');
  });

  test('mkVideoAd(非viewthrough)の正常確認', async () => {
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    await iframeAtvad.mkVideoAd();

    // ck
    expect(location.search.substring(1)).not.toBeNull();
    expect(ElementFactory.mkElement).not.toHaveBeenCalled();
  });
});

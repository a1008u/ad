import { Jsontype } from '../../../src/videoad/service/class/jsontype';
//import { mkfadeIn, exec } from '../../../src/atvad/ts/main';

const domain: string = 'http://localhost:3000';

// describe('iframeで表示するvideoなどのデータ取得確認', () => {
//   const rkValue = '010011a1';

//   beforeEach(() => {
//     document.body.innerHTML = `<script async id='mexec' data-atv-mock="true" data-atv-rk="010011a1_pc" ></script>`;
//     jest.setTimeout(50000);
//   });
//   test('正常', async () => {
//     // spiの設定
//     // const em = require('../../../src/atvad/ts/EmergenceFactory');
//     // const spy = jest.spyOn(em, 'emergenceInit').mockImplementation();

//     // exe
//     let scriptElement: any = document.getElementById('mexec');
//     await exec(scriptElement, window);

//     // ck
//     const resultIframeElement = document.getElementsByName('iframe');
//     expect((resultIframeElement[0] as HTMLIFrameElement).name).toEqual('iframe');
//     // expect(spy).toHaveBeenCalled();
//   });
// });

// describe('styleのチェック', () => {
//   const rkValue = '010011a1';

//   beforeEach(() => {
//     document.body.innerHTML = `<script async data-atv-mode="preview" data-atv-mock="true" data-atv-rk="010011a1" ></script>`;
//     jest.setTimeout(30000);
//   });

//   test('正常', async () => {
//     // exe
//     await mkfadeIn();

//     // ck
//     const resultIframeElement = document.getElementsByTagName('style');
//     expect((resultIframeElement[0] as HTMLStyleElement).media).toEqual('screen');
//   });
// });

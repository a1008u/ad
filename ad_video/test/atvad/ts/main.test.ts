// import { Jsontype } from '../../../src/videoad/service/class/jsontype';
// import { exec } from '../../../src/atvad/ts/main';
// import { IframePreview } from '../../../src/atvad/ts/IframePreview';

// const domain: string = 'http://localhost:3000';

// describe('iframeで表示するvideoなどのデータ取得確認', () => {
//   const rkValue = '010011a1';

//   beforeEach(() => {
//     document.body.innerHTML = `<script async id='mexec' data-atv-mock="true" data-atv-rk="010011a1_pc" ></script>`;
//     jest.setTimeout(50000);
//   });
//   test('正常', async () => {
//     // spiの設定
//     // const em = require('../../../src/atvad/ts/EmergenceFactory');
//     const spy = jest.spyOn(IframePreview.prototype, 'mainExecPreview').mockImplementation();

//     // exe
//     let scriptElement: HTMLElement = document.getElementById('mexec');
//     await exec(scriptElement as HTMLScriptElement, window);
//     console.log(scriptElement.getAttribute('data-atv-rk'))

//     // ck
//     const resultIframeElement = document.getElementsByName('iframe');
//     // expect(resultIframeElement).toEqual('iframe');
//     expect(spy).toHaveBeenCalled();
//   });
// });

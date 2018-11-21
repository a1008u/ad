// import { FilterEnd } from "../../../../../../src/videoad/atvad/ts/service/Filter/FilterEnd";


// describe('execFilnotAnimationの確認', () => {

//   beforeEach(() => {
//     document.body.innerHTML = `
//     <div id="test">
//       <video playxxx="play" id="atvVideo" playsinline="playsinline" muted="" src="http://localhost:3000/videoad/atvad/mp4/ba1.mp4" width="640"></video>
//     </div>`;

//     // spyの設定
    
//   });

//   afterEach(() => {
//     // exe
//     const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
//     videoElement.parentNode.removeChild(videoElement);

//     // spyの削除
//     jest.spyOn(Element.prototype, 'setAttribute').mockRestore();
//   });

//   test('正常確認', async () => {

//     // mock
//     // Element.prototype.setAttribute = jest.fn().mockImplementation(() => {
//     //   let tDom: HTMLDivElement = document.createElement('div');
//     //   tDom.setAttribute('id', 'filter');
//     //   tDom.setAttribute('testkey', 'filter');
//     //   return tDom;
//     // });

//     let tDom = document.createElement('div');
//     tDom.setAttribute('id', 'filter');
//     tDom.setAttribute('testkey', 'filter');
//     jest
//       .spyOn(Element.prototype, 'setAttribute')
//       .mockImplementation(() => tDom);

//     // exe;
//     const videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
//     const filterEnd: FilterEnd = new FilterEnd();
//     const divElementFilter = await filterEnd.execFilnotAnimation(videoElement, 'play');

//     // ck
//     console.log(divElementFilter.firstElementChild.firstElementChild.getAttribute('style'))
//     //expect(divElementFilter.firstElementChild.firstElementChild.getAttribute('style')).toEqual('filterEnd');
//   });
// });


import { tag } from '../../../service/tag';
import { AnyRecordWithTtl } from 'dns';

export namespace videoEvent {
  /**
   * イベント処理
   * @param {HTMLVideoElement} videoTag
   * @param {HTMLAnchorElement} aTag
   * @param {number} limitTime
   */
  export const setEvent = (
    videoTag: HTMLVideoElement,
    aTag: HTMLAnchorElement,
    limitTime: number = 10000
  ) => {
    let count = 0;
    let cntEvt;

    // viewthrough
    videoTag.addEventListener('play', () => {
      if (count < limitTime) {
        cntEvt = window.setInterval(() => {
          count += 250;
          if (count > limitTime) {
            window.clearInterval(cntEvt);
            let iframeTag: HTMLIFrameElement = tag.mkTrackingTag(videoTag);
            videoTag.parentNode.insertBefore(iframeTag, videoTag);

          }
        }, 250);
      }
    });

    videoTag.addEventListener('ended', () => {
      console.log('play ---------------------');
      videoTag.play();
    });


    // viewthrough(pauseの場合は、繰り返し動作を止める)
    videoTag.addEventListener('pause', () => {
      if (cntEvt) {
        window.clearInterval(cntEvt);
      }
    });

    // videoタグ（aタグ）をクリックされた場合
    videoTag.parentNode.addEventListener('click', () => {
      videoTag.pause();
      aTag.href += '&p=' + videoTag.currentTime;
    });
  };

  /**
   * viewthrowの動き
   * @param videoTag 
   * @param limitTime 
   */
  export const setEventForTest = (
    videoTag: HTMLVideoElement,
    limitTime: number = 10000
  ) => {
    let count = 0;
    let cntEvt;

        // viewthrough
        videoTag.addEventListener('play', () => {
            if (count < limitTime) {
                cntEvt = window.setInterval(() => {
                    count += 250;
                    if (count > limitTime) {
                        window.clearInterval(cntEvt);
                        let iframeTag: HTMLIFrameElement = tag.mkTrackingTag(videoTag);
                        videoTag.parentNode.insertBefore(iframeTag, videoTag);

                        const divElement: HTMLDivElement = document.createElement('div');
                        divElement.textContent = 'viewthroughをしました';
                        videoTag.parentNode.parentNode.insertBefore(divElement, videoTag.parentElement);

                    }
                }, 250);
            }
        });

        // viewthrough(pauseの場合は、繰り返し動作を止める)
        videoTag.addEventListener('pause', () => {
            if (cntEvt) {
                window.clearInterval(cntEvt);
            }
        });

      videoTag.addEventListener('mouseover',() => {

          let fillter_off: string = videoTag.getAttribute('___filter');
          if(fillter_off === 'off') {
              videoTag.removeAttribute('___filter');
          } else {
              videoTag.classList.add('___videostop');
              videoTag.parentElement.classList.add('__aparent');
              const divElement_fil: HTMLDivElement = document.createElement('div');
              divElement_fil.classList.add('__filter');
              divElement_fil.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px; padding: 12%; cursor:pointer`);

              const imgElement_play: HTMLObjectElement = document.createElement('object');
              imgElement_play.setAttribute('id','___obj');
              let playMode: string = videoTag.getAttribute('playxxx');

              if(playMode === 'pause') {
                  // imgElement_play.textContent = '再生';
                  imgElement_play.setAttribute('type','image/svg+xml');
                  imgElement_play.setAttribute('data','../svg/play-circle-solid.svg');
                  imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth/2)}px; height:${String(videoTag.clientHeight/2)}px; pointer-events: none;`);
                  imgElement_play.setAttribute('___text','play');
              } else {
                  // imgElement_play.textContent = '停止';
                  imgElement_play.setAttribute('type','image/svg+xml');
                  imgElement_play.setAttribute('data','../svg/pause-circle-solid.svg');
                  imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth/2)}px; height:${String(videoTag.clientHeight/2)}px; pointer-events: none;`);
                  imgElement_play.setAttribute('___text','pause');
              }
              divElement_fil.appendChild(imgElement_play);
              videoTag.parentElement.appendChild(divElement_fil);

              let cleanUp = () =>{
                  console.log('del');
                  videoTag.removeAttribute('___videostop');
                  videoTag.parentElement.removeAttribute('__aparent');
                  videoTag.parentElement.removeChild(divElement_fil);
              };
              setTimeout(cleanUp, 1000);

              divElement_fil.addEventListener('click',() => {
                  console.log('クリックを検知');
                  let playMode: string = videoTag.getAttribute('playxxx');
                  if(playMode === 'pause') {
                      videoTag.play();
                      videoTag.setAttribute('playxxx','play');
                  } else {
                      videoTag.pause();
                      videoTag.setAttribute('playxxx','pause');
                  }

                  // TODO あとで共通化
                  console.log('del');
                  videoTag.removeAttribute('___videostop');
                  videoTag.setAttribute('___filter','off');
                  videoTag.parentElement.removeAttribute('__aparent');
                  videoTag.parentElement.removeChild(divElement_fil);
              })

          }

      });


      videoTag.addEventListener('touchstart',() => {

        let fillter_off: string = videoTag.getAttribute('___filter');
        if(fillter_off === 'off') {
            videoTag.removeAttribute('___filter');
        } else {
            videoTag.classList.add('___videostop');
            videoTag.parentElement.classList.add('__aparent');
            const divElement_fil: HTMLDivElement = document.createElement('div');
            divElement_fil.classList.add('__filter');
            divElement_fil.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px; padding: 12%; cursor:pointer`);

            const imgElement_play: HTMLObjectElement = document.createElement('object');
            imgElement_play.setAttribute('id','___obj');
            let playMode: string = videoTag.getAttribute('playxxx');

            if(playMode === 'pause') {
                // imgElement_play.textContent = '再生';
                imgElement_play.setAttribute('type','image/svg+xml');
                imgElement_play.setAttribute('data','../svg/play-circle-solid.svg');
                imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth/2)}px; height:${String(videoTag.clientHeight/2)}px; pointer-events: none;`);
                imgElement_play.setAttribute('___text','play');
            } else {
                // imgElement_play.textContent = '停止';
                imgElement_play.setAttribute('type','image/svg+xml');
                imgElement_play.setAttribute('data','../svg/pause-circle-solid.svg');
                imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth/2)}px; height:${String(videoTag.clientHeight/2)}px; pointer-events: none;`);
                imgElement_play.setAttribute('___text','pause');
            }
            divElement_fil.appendChild(imgElement_play);
            videoTag.parentElement.appendChild(divElement_fil);

            let cleanUp = () =>{
                console.log('del');
                videoTag.removeAttribute('___videostop');
                videoTag.parentElement.removeAttribute('__aparent');
                videoTag.parentElement.removeChild(divElement_fil);
            };
            setTimeout(cleanUp, 1000);

            divElement_fil.addEventListener('touchstart',() => {
                console.log('クリックを検知');
                let playMode: string = videoTag.getAttribute('playxxx');
                if(playMode === 'pause') {
                    videoTag.play();
                    videoTag.setAttribute('playxxx','play');
                } else {
                    videoTag.pause();
                    videoTag.setAttribute('playxxx','pause');
                }

                // TODO あとで共通化
                console.log('del');
                videoTag.removeAttribute('___videostop');
                videoTag.setAttribute('___filter','off');
                videoTag.parentElement.removeAttribute('__aparent');
                videoTag.parentElement.removeChild(divElement_fil);
            })

            window.addEventListener('orientationchange', () => {
              if(divElement_fil) {
                videoTag.removeAttribute('___videostop');
                videoTag.setAttribute('___filter','off');
                videoTag.parentElement.removeAttribute('__aparent');
                videoTag.parentElement.removeChild(divElement_fil);
              }

              if(playMode === 'pause') {
                videoTag.play();
                videoTag.setAttribute('playxxx','play');
                videoTag.removeAttribute('___videostop');
              } 
            });
        }

    });

    };

    /**
     *
      * @param videoTag
     * @param aElementText
     */
  export const setEventLoad = (videoTag: HTMLVideoElement, aElementText: string = 'テスト') => {

    videoTag.addEventListener('ended', () => {
      const divElement_fil: HTMLDivElement = document.createElement('div');
      divElement_fil.classList.add('__a');
      const divElement_1: HTMLDivElement = document.createElement('div');
      divElement_1.classList.add('__link');
      divElement_1.appendChild(divElement_fil);

      const aElement2: HTMLAnchorElement = document.createElement('a');
      aElement2.textContent = aElementText;
      aElement2.href = 'https://www.google.com/';
      aElement2.classList.add('__a2');
      const divElement_2: HTMLDivElement = document.createElement('div');
      divElement_2.classList.add('__play');
      divElement_2.appendChild(aElement2);

      const divElement: HTMLDivElement = document.createElement('div');
      divElement.classList.add('__button');

      divElement.appendChild(divElement_1);
      divElement.appendChild(divElement_2);

      videoTag.classList.add('__video');
      videoTag.setAttribute('__end', 'true');
      videoTag.parentElement.classList.add('__aparent');
      let typeCss: string = videoTag.getAttribute('test-css-type');

      let targeElement: HTMLElement = videoTag.parentElement.parentElement;

      switch(typeCss) {
        case '9':
          targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);

            const imgElement_play: HTMLObjectElement = document.createElement('object');
            imgElement_play.setAttribute('type','image/svg+xml');
            imgElement_play.setAttribute('data','../svg/play-circle-solid.svg');
            imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth/3)}px; height:${String(videoTag.clientHeight/3)}px; pointer-events: none;`);
            divElement_1.addEventListener('click', () => {
                let targeElement: HTMLElement = videoTag.parentElement.parentElement;
                divElement.textContent = null;
                targeElement.removeChild(divElement);
                videoTag.removeAttribute('__end');
                videoTag.play();
            });

            divElement_1.appendChild(imgElement_play);

          aElement2.classList.add('___a2');
          aElement2.textContent = 'インストールはこちら（１６文字）';
          break;

        case '10':
          targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);
          divElement_fil.classList.add('___a');
          divElement_fil.textContent = '再生';
          aElement2.classList.add('___a2');
          aElement2.textContent = '詳細はこちらへどうぞ（１６文字）';

            divElement_fil.addEventListener('click', () => {
              let targeElement: HTMLElement = videoTag.parentElement.parentElement;
              divElement.textContent = null;
              targeElement.removeChild(divElement);
              videoTag.removeAttribute('__end');
              videoTag.play();
            });

          break;

        case '11':
        targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 13% 0%;`);
          divElement_fil.classList.add('___a');
          divElement_fil.textContent = '再生';
          aElement2.classList.add('___a2');
          aElement2.textContent = '詳細はこちら（１２文字）';

            divElement_fil.addEventListener('click', () => {
                let targeElement: HTMLElement = videoTag.parentElement.parentElement;
                divElement.textContent = null;
                targeElement.removeChild(divElement);
                videoTag.removeAttribute('__end');
                videoTag.play();
            });

          break;

        case '12':
          targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);
          divElement_fil.classList.add('___a');
          divElement_fil.textContent = '再生';
          aElement2.classList.add('___a2');
          aElement2.textContent = '詳細を知りたい方はこちらへどうぞ（２２文字）';

            divElement_fil.addEventListener('click', () => {
                let targeElement: HTMLElement = videoTag.parentElement.parentElement;
                divElement.textContent = null;
                targeElement.removeChild(divElement);
                videoTag.removeAttribute('__end');
                videoTag.play();
            });

          break;
      }

      window.addEventListener('orientationchange', () => {
        let targeElement: HTMLElement = videoTag.parentElement.parentElement;
        divElement.textContent = null;
        targeElement.removeChild(divElement);
        videoTag.removeAttribute('__end');
        videoTag.play();
      });

      targeElement.appendChild(divElement);
      console.log('div生成');
    });
  };

  // 削除
  export let ckOreientation = () => {

    // 正面かどうか判定
    // let isReverse = false;

    // if(navigator.userAgent.indexOf('Android') > 0) {
    //   // Androidなら正面設定を確認
    //   let oritentation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    // }

    window.addEventListener('orientationchange', () => {
      let target = document.getElementById('__this');
      if (window.orientation === 0) {
        target.textContent = '縦縦縦縦縦縦縦縦';
      } else {
        target.textContent = 'ヨコヨコ横ヨコヨコ';
      }
    })


  }
}

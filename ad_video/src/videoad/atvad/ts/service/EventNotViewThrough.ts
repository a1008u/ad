import * as Rx from "rxjs";
import { Filter } from "./Filter";
import { osFontSize } from "./OsFontSize";
import { oschecker } from "../../../service/oschecker";
import { Jsontype } from "../../../service/jsontype";

export namespace EventNotViewThrough {

  const getAdAreaValue = (atvJson: Jsontype) => {
    let leftSize: string;
    let rightSize: string;
    let hrefValue: string;
    let target: string;
    let btnPaddingUpDown: string;
    let btnPaddingLeftRight: string;
    if (atvJson.ATV_MODE === 'previewPcAdarea') {
      [leftSize, rightSize, btnPaddingUpDown, btnPaddingLeftRight] = ['28px', '24px', '10px', '20px'];
      hrefValue = '#!';
      target = ``;
    } else if (atvJson.ATV_MODE === 'previewSpAdarea') {
      [leftSize, rightSize, btnPaddingUpDown, btnPaddingLeftRight] = ['16px', '12px', '5px', '10px'];
      hrefValue = '#!';
      target = ``;
    } else {
      [leftSize, rightSize, btnPaddingUpDown, btnPaddingLeftRight] = osFontSize.getSize[oschecker.isolate()]();
      hrefValue = atvJson.href_url;
      target = `target="_blank"`;
    }
    return { leftSize, hrefValue, rightSize, target, btnPaddingUpDown, btnPaddingLeftRight};
  };

  // AdAreaの作成
  export const mkAdArea = (atvJson: Jsontype): string => {
    let { leftSize, hrefValue, rightSize, target, btnPaddingUpDown, btnPaddingLeftRight}: { leftSize: string; hrefValue: string; rightSize: string; target: string; btnPaddingUpDown: string; btnPaddingLeftRight: string;} = getAdAreaValue(atvJson);
    return `<div class="__divTextElement" style="height:${atvJson.ADAREA_HEIGHT}px">
              <div class="__divTextLeftElement" style="font-size:${leftSize}">
                <span class="__atv_text">${atvJson.banner_text}</span>
              </div>
              <div class="__divTextRightElement">
                <a class="__atv_text" href="${hrefValue}" ${target} /">
                  <span class="__atv_button" ontouchstart="" style="font-size:${rightSize}; padding:${btnPaddingUpDown} ${btnPaddingLeftRight}">${atvJson.video_btn_text}</>
                </a>
              </div>
            </div>`;
  };

  /**
   *
   * @param videoTag
   */
  export const setEventLoad = (videoElement: HTMLVideoElement) => {
    const deleteFilter = (ev: any) => {
      let targeFilterElement: HTMLElement = ev.target;
      targeFilterElement.parentElement.removeChild(targeFilterElement);
      videoElement.removeAttribute('__end');
      videoElement.play();
    };

    videoElement.addEventListener('ended', () => {
      Filter.execFilnotAnimation(videoElement, 'pause').then(divElementFilter => {
        const mainDivElement: HTMLElement = videoElement.parentElement;
        mainDivElement.classList.add('__aparent');
        mainDivElement.appendChild(divElementFilter);
        videoElement.setAttribute('__end', 'true');

        const filter$: Rx.Observable<any> = Rx.fromEvent(divElementFilter, 'click');
        filter$.subscribe(ev => {
          deleteFilter(ev);
        });
      });
    });
  };

}

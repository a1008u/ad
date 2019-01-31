import { Observable, fromEvent } from 'rxjs';

import { Jsontype } from '../../../service/class/jsontype';
import { FilterStartAndEnd } from './Filter/FilterStartAndEnd';

export namespace EventNotViewThrough {
  // AdAreaの作成
  export const mkAdArea = (atvJson: Jsontype): string => {
    const leftSize: string = atvJson.height === '360' ? '22px' : '16px';
    const hrefValue: string = atvJson.href_url;
    const rightSize: string = atvJson.height === '360' ? '20px' : '11px';
    const target: string =
      atvJson.ATV_MODE === 'previewPcAdarea' ||
      atvJson.ATV_MODE === 'previewSpAdarea'
        ? atvJson.target
        : `target="_blank"`;
    const btnPaddingUpDown: string = atvJson.height === '360' ? '10px' : '5px';
    const btnPaddingLeftRight: string =
      atvJson.height === '360' ? '20px' : '10px';
    return `<div class="__divTextElement" style="height:${
      atvJson.ADAREA_HEIGHT
    }px">
      <div class="__divTextLeftElement" style="font-size:${leftSize}">
        <span class="__atv_text">${atvJson.banner_text}</span>
      </div>
      <div class="__divTextRightElement">
        <a class="__atv_text" href="${hrefValue}" ${target}>
          <span class="__atv_button" ontouchstart="" style="font-size:${rightSize}; padding:${btnPaddingUpDown} ${btnPaddingLeftRight}">
            ${atvJson.video_btn_text}
          </span>
        </a>
      </div>
    </div>`;
  };

  /**
   * 再生再開を行う
   * @param videoElement
   */
  export const setEventLoad = (
    videoElement: HTMLVideoElement,
    atvJson: Jsontype,
  ) => {
    const deleteFilter = (ev: any) => {
      const targeFilterElement: HTMLElement = ev.target;
      targeFilterElement.parentElement.removeChild(targeFilterElement);
      videoElement.removeAttribute('__end');
      videoElement.play();
    };

    const endFilter = (
      videoElement: HTMLVideoElement,
      $divElementFilter: HTMLDivElement,
    ) => {
      const mainDivElement: HTMLElement = videoElement.parentElement;
      mainDivElement.classList.add('__aparent');
      mainDivElement.appendChild($divElementFilter);
      videoElement.setAttribute('__end', 'true');
    };

    const filterEnd: FilterStartAndEnd = new FilterStartAndEnd();
    videoElement.addEventListener('ended', () => {
      filterEnd
        .execFilnotAnimation(videoElement, atvJson, 'play')
        .then(divElementFilter => {
          // 動画再生終了フィルターの表示
          endFilter(videoElement, divElementFilter);

          // 動画停止後、再生ボタンをクリックしたタイミングで再生を行う
          const filter$: Observable<any> = fromEvent(divElementFilter, 'click');
          filter$.subscribe(ev => deleteFilter(ev));
        });
    });
  };
}

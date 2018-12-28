import { Observable, fromEvent } from 'rxjs';

import { osFontSize } from './OsFontSize';
import { oschecker } from '../../../service/oschecker';
import { Jsontype } from '../../../service/class/jsontype';
import { FilterStartAndEnd } from './Filter/FilterStartAndEnd';

export namespace EventNotViewThrough {
  const getAdAreaValue = (atvJson: Jsontype) => {
    let leftSize: string;
    let rightSize: string;
    let hrefValue: string;
    let target: string;
    let btnPaddingUpDown: string;
    let btnPaddingLeftRight: string;
    let onClick: string;
    if (atvJson.ATV_MODE === 'previewPcAdarea') {
      leftSize = '22px';
      rightSize = '20px';
      btnPaddingUpDown = '10px';
      btnPaddingLeftRight = '20px';
      hrefValue = atvJson.href_url;
      target = atvJson.target;
      onClick = atvJson.onClick;
    } else if (atvJson.ATV_MODE === 'previewSpAdarea') {
      leftSize = '16px';
      rightSize = '12px';
      btnPaddingUpDown = '5px';
      btnPaddingLeftRight = '10px';
      hrefValue = atvJson.href_url;
      target = atvJson.href_url === '#!' ? `` : `target="_blank"`;
      onClick = 'onClick="hogeFunction();return false;"';
    } else {
      [
        leftSize,
        rightSize,
        btnPaddingUpDown,
        btnPaddingLeftRight,
      ] = osFontSize.getSize[oschecker.isolate()]();
      hrefValue = atvJson.href_url;
      target = `target="_blank"`;
      onClick = '';
    }
    return {
      leftSize,
      hrefValue,
      rightSize,
      target,
      btnPaddingUpDown,
      btnPaddingLeftRight,
      onClick,
    };
  };

  // AdAreaの作成
  export const mkAdArea = (atvJson: Jsontype): string => {
    const {
      leftSize,
      hrefValue,
      rightSize,
      target,
      btnPaddingUpDown,
      btnPaddingLeftRight,
      onClick,
    }: {
      leftSize: string;
      hrefValue: string;
      rightSize: string;
      target: string;
      btnPaddingUpDown: string;
      btnPaddingLeftRight: string;
      onClick: string;
    } = getAdAreaValue(atvJson);
    return `<div class="__divTextElement" style="height:${
      atvJson.ADAREA_HEIGHT
    }px">
      <div class="__divTextLeftElement" style="font-size:${leftSize}">
        <span class="__atv_text">${atvJson.banner_text}</span>
      </div>
      <div class="__divTextRightElement">
        <a class="__atv_text" href="${hrefValue}" ${target} ${onClick} /">
          <span class="__atv_button" ontouchstart="" style="font-size:${rightSize}; padding:${btnPaddingUpDown} ${btnPaddingLeftRight}">${
      atvJson.video_btn_text
    }</>
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
      let targeFilterElement: HTMLElement = ev.target;
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

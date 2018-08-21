/**
 * viewthrowの判定処理
 */
export namespace viewstatus {
  /**
   * 動画表示状態判定
   * @param {HTMLVideoElement} videoTag
   * @returns {boolean}
   */
  export const ckViewStatus = (videoTag: HTMLVideoElement): boolean => {
    const emergenceData: string = videoTag.getAttribute('data-emergence');
    return emergenceData === 'visible' ? true : false;
  };
}

// export namespace viewstatus {
//   const getWindowDimensions = (): dimension => {
//     const doel: HTMLElement = document.documentElement;
//     return window.pageYOffset !== undefined
//       ? {
//           scrollTop: window.pageYOffset,
//           scrollLeft: window.pageXOffset,
//           height: window.innerHeight,
//           width: window.innerWidth,
//         }
//       : {
//           scrollTop: doel.scrollTop,
//           scrollLeft: doel.scrollLeft,
//           height: doel.clientHeight,
//           width: doel.clientWidth,
//         };
//   };

//   const getPosition = (videoTag: HTMLVideoElement): position => {
//     let left: number = 0;
//     let top: number = 0;
//     while (videoTag && videoTag.offsetParent) {
//       left += videoTag.offsetLeft;
//       top += videoTag.offsetTop;
//       videoTag = videoTag.offsetParent as HTMLVideoElement;
//     }
//     return { top: top, left: left };
//   };

//   /**
//    * 動画表示状態判定
//    * @param {HTMLVideoElement} videoTag
//    * @returns {boolean}
//    */
//   export const ckViewStatus = (videoTag: HTMLVideoElement): boolean => {
//     const winDimension: dimension = getWindowDimensions();
//     const pos: position = getPosition(videoTag);

//     // return pos.top >= win.scrollTop && pos.top <= win.scrollTop + win.height;
//     // 条件：画面全体 >=
//     // return (
//     //   winDimension.scrollTop + winDimension.height >=
//     //     pos.top + videoTag.height && winDimension.scrollTop <= pos.top
//     // );
//   };
// }

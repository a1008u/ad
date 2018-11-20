// pasue処理
export namespace VideoAction {
  // pause処理
  export const pauseAction = (videoElement: HTMLVideoElement) => {
    videoElement.setAttribute('playxxx', 'pause');
    videoElement.pause();
  };
  // play処理
  export const playAction = (videoElement: HTMLVideoElement) => {
    videoElement.setAttribute('playxxx', 'play');
    videoElement.play();
  };
}
import { EventViewThrough } from "../EventViewThrough";

export namespace VideoFilterEventFactory {
  export const osEvent: OS = {
    ios: (videoTag: HTMLVideoElement) => {
      console.log('smart phoneと判定');
      EventViewThrough.setTouchEventSmartPhone(videoTag);
    },
    android: (videoTag: HTMLVideoElement) => {
      console.log('smart phoneと判定');
      EventViewThrough.setTouchEventSmartPhone(videoTag);
    },
    windowsphone: (videoTag: HTMLVideoElement) => {
      console.log('smart phoneと判定');
      EventViewThrough.setTouchEventSmartPhone(videoTag);
    },
    pc: (videoTag: HTMLVideoElement) => {
      console.log('pcと判定');
      EventViewThrough.setClickEventPC(videoTag);
    },
  };
}

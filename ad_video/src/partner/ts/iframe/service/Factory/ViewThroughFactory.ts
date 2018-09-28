import { EventViewThrough } from "../EventViewThrough";

export namespace ViewThroughFactory {
  export const osEvent: OS = {
    ios: (videoTag: HTMLVideoElement) => {
      console.log('smart phoneと判定');
      EventViewThrough.setEventViewThroughSmartPhone(videoTag);
    },
    android: (videoTag: HTMLVideoElement) => {
      console.log('smart phoneと判定');
      EventViewThrough.setEventViewThroughSmartPhone(videoTag);
    },
    windowsphone: (videoTag: HTMLVideoElement) => {
      console.log('smart phoneと判定');
      EventViewThrough.setEventViewThroughSmartPhone(videoTag);
    },
    pc: (videoTag: HTMLVideoElement) => {
      console.log('pcと判定');
      EventViewThrough.setEventViewThroughPC(videoTag);
    },
  };
}

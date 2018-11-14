import { EventViewThrough } from '../EventViewThrough';
import { Jsontype } from '../../../../service/jsontype';
import { OS } from '../../../../interface/OS';

export namespace VideoFilterEventFactory {
  export const osEvent: OS = {
    ios: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      console.log('smart phoneと判定');
      EventViewThrough.setTouchEventSmartPhone(videoTag, atvJson);
    },
    android: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      console.log('smart phoneと判定');
      EventViewThrough.setTouchEventSmartPhone(videoTag, atvJson);
    },
    windowsphone: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      console.log('smart phoneと判定');
      EventViewThrough.setTouchEventSmartPhone(videoTag, atvJson);
    },
    pc: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      console.log('pcと判定');
      EventViewThrough.setClickEventPC(videoTag, atvJson);
    },
  };
}

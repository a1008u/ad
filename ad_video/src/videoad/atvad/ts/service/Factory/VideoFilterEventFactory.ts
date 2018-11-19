import { EventViewThrough } from '../EventViewThrough';
import { Jsontype } from '../../../../service/class/jsontype';
import { OS } from '../../../../service/interface/OS';

export namespace VideoFilterEventFactory {
  export const osEvent: OS = {
    ios: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      EventViewThrough.setTouchEventSmartPhone(videoTag, atvJson);
    },
    android: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      EventViewThrough.setTouchEventSmartPhone(videoTag, atvJson);
    },
    windowsphone: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      EventViewThrough.setTouchEventSmartPhone(videoTag, atvJson);
    },
    pc: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      EventViewThrough.setClickEventPC(videoTag, atvJson);
    },
  };
}

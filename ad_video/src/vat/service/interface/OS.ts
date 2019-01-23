import { Jsontype } from '../class/jsontype';

export interface OS {
  ios: (videoElement: HTMLVideoElement, atvJson: Jsontype) => void;
  android: (videoElement: HTMLVideoElement, atvJson: Jsontype) => void;
  windowsphone: (videoElement: HTMLVideoElement, atvJson: Jsontype) => void;
  pc: (videoElement: HTMLVideoElement, atvJson: Jsontype) => void;
}

import { Jsontype } from '../service/class/jsontype';

export interface OS {
  ios: (videoElement: HTMLVideoElement, atvJson: Jsontype) => void;
  android: (videoElement: HTMLVideoElement, atvJson: Jsontype) => void;
  windowsphone: (videoElement: HTMLVideoElement, atvJson: Jsontype) => void;
  pc: (videoElement: HTMLVideoElement, atvJson: Jsontype) => void;
}

export interface OSFontsize {
  ios: (divTextLeftElement, divTextRightElement) => void;
  android: (vdivTextLeftElement, divTextRightElement) => void;
  windowsphone: (divTextLeftElement, divTextRightElement) => void;
  pc: (divTextLeftElement, divTextRightElement) => void;
}

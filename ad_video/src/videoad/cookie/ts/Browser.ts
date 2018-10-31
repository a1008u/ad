import { Jsoncookie } from '../../service/jsoncookie';

export interface Browser {
  ie: (jsoncookie: Jsoncookie) => void;
  edge: (jsoncookie: Jsoncookie) => void;
  chrome: (jsoncookie: Jsoncookie) => void;
  firefox: (jsoncookie: Jsoncookie) => void;
  opera: (jsoncookie: Jsoncookie) => void;
  safari: (jsoncookie: Jsoncookie) => void;
  itp_safari: (jsoncookie: Jsoncookie) => void;
  unknown: (jsoncookie: Jsoncookie) => void;
}
interface Browser {
  ie: (domain: string) => void;
  edge: (domain: string) => void;
  chrome: (domain: string) => void;
  firefox: (domain: string) => void;
  opera: (domain: string) => void;
  safari: (domain: string) => void;
  itp_safari: (domain: string) => void;
  unknown: (domain: string) => void;
}
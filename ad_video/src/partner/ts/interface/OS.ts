interface OS {
    ios: (videoElement: HTMLVideoElement) => void;
    android: (videoElement: HTMLVideoElement) => void;
    windowsphone:  (videoElement: HTMLVideoElement) => void;
    pc:  (videoElement: HTMLVideoElement) => void;
}


interface OS2 {
    ios: (divTextLeftElement, divTextRightElement) => void;
    android: (vdivTextLeftElement, divTextRightElement) => void;
    windowsphone:  (divTextLeftElement, divTextRightElement) => void;
    pc:  (divTextLeftElement, divTextRightElement) => void;
}

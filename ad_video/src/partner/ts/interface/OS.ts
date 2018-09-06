interface OS {
    ios: (videoElement: HTMLVideoElement) => void;
    android: (videoElement: HTMLVideoElement) => void;
    windowsphone:  (videoElement: HTMLVideoElement) => void;
    pc:  (videoElement: HTMLVideoElement) => void;
}

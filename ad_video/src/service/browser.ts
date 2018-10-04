import * as Platform from 'platform';

export namespace browser {

  /**
   * itp対応ブラウザとOSのバージョンを確認する
   *
   * IE10以前 - MSIEでチェック
   * IE11 - Trident/7.0でチェック
   *
   * safari - safariでチェック
   * *osでバージョンチェック
   *
   * chrome - chromeでチェック
   * firefox - firefoxでチェック
   *
   * @returns {boolean}
   */
  export let ck = (): string => {
    const browser: string = (() => {
      const browserName: string = Platform.name.toLowerCase();
      if (browserName === "ie") return browserName;
      else if (browserName === "edge") return browserName;
      else if (browserName === "chrome") return browserName;
      else if (browserName === "firefox") return browserName;
      else if (browserName === "opera") return browserName;
      else if (browserName === "safari") return browserName;
      else return "unknown";
    })();

    if (browser === 'safari') {
      let iosVersion = Platform.os.version.toLowerCase().match(/(\d{2})./);
      if (iosVersion !== null && +iosVersion[1] >= 11) {
        return 'itp_safari';
      }

      let macVersion = Platform.os.version.toLowerCase().match(/10.(\d{2})/);
      if (macVersion !== null && +macVersion[1] >= 13) {
        return 'itp_safari';
      }
      return browser;
    }
    return browser;
  };
}

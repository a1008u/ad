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
   * @param ua(userAgant)
   * @returns {boolean}
   */
  export let ck = (ua: string): string => {
    if (ua.indexOf('msie') !== -1 || ua.indexOf('trident') !== -1) {
      console.log('Internet Explorerをお使いですね');
      return 'ie';
    } else if (ua.indexOf('edge') !== -1) {
      console.log('Edgeをお使いですね');
      return 'edge';
    } else if (ua.indexOf('chrome') !== -1) {
      console.log('Google Chromeをお使いですね');
      return 'chrome';
    } else if (ua.indexOf('safari') !== -1) {
      let iosVersion = ua.match(/os (\d{2})_/);
      if (iosVersion !== null && +iosVersion[1] >= 11) {
        return 'safari_itp';
      }

      let macVersion = ua.match(/mac os x 10_(\d{2})/);
      if (macVersion !== null && +macVersion[1] >= 13) {
        return 'safari_itp';
      }

      console.log('Safariをお使いですね');
      return 'safari';
    } else if (ua.indexOf('firefox') !== -1) {
      console.log('FireFoxをお使いですね');
      return 'firefox';
    } else if (ua.indexOf('opera') !== -1) {
      console.log('Operaをお使いですね');
      return 'opera';
    } else {
      console.log('そんなブラウザは知らん');
      return 'unknown';
    }
  };

  // if (
  //     (ua.indexOf('macintosh') !== -1 || ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1)
  //     && ua.indexOf('safari') !== -1
  //     && ua.indexOf('version') !== -1
  //     && ua.indexOf('chrome') === -1
  //     && ua.indexOf('firefox') === -1
  //     && ua.indexOf('edge') === -1
  // ) {
  //
  // }
}

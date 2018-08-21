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
   * @param ua(userAgant)
   * @returns {boolean}
   */
  export let ck = (ua: string): string => {
    let platName: string = Platform.name.toLowerCase();
    if (platName === null) {
      return 'unknown';
    }

    console.log('----------platform   ------- ' + platName);

    let platName2 = (()=> {
      if (platName === "ie") return platName;
      else if (platName === "edge") return platName;
      else if (platName === "chrome") return platName;
      else if (platName === "firefox") return platName;
      else if (platName === "opera") return platName;
      else if (platName === "safari") return platName;
      else return "unknown";
    })();

    if (platName2 === 'safari') {
      console.log('----------platform   ------- ' + Platform.os.version.toLowerCase());
      let platNameSafari: string = 'safari';
      let iosVersion = Platform.os.version.toLowerCase().match(/(\d{2})./);
      if (iosVersion !== null && +iosVersion[1] >= 11) {
        platNameSafari = 'safari_itp';
      }

      let macVersion = Platform.os.version.toLowerCase().match(/10.(\d{2})/);
      if (macVersion !== null && +macVersion[1] >= 13) {
        platNameSafari = 'safari_itp';
      }
      console.log('----------platform   ------- ' + platNameSafari);
      return platNameSafari;
    }
    return platName2;
  };
}
    // switch (platName) {
    //   case  "ie":
    //     return platName;
    //   case  "edge":
    //     return platName;
    //   case  "chrome":
    //     return platName;
    //   case  "firefox":
    //     return platName;
    //   case  "opera":
    //     return platName;
    //   case "safari":

        // return (Number(Platform.version.toLowerCase().match(/(\d{2})./)[1]) >= 11) 
        //   ? 'safari_itp'
        //   : 'safari';

        

        // let platNameSafari: string = 'safari';
        // console.log('----------platform   ------- ' +  Platform.version.toLowerCase());
       
        // console.log('----------platform   ------- ' +  Platform.description.toLowerCase().match(/safari (\d{2})./));
        // let iosVersion = Platform.version.toLowerCase().match(/safari (\d{2})./);
        // if (iosVersion !== null && +iosVersion[1] >= 11) {
        //   platNameSafari = 'safari_itp';
        // }

        // console.log('----------platform   ------- ' +  Platform.description.toLowerCase().match(/mac os x 10.(\d{2})/));
        // let macVersion = Platform.description.toLowerCase().match(/mac os x 10_.(\d{2})/);
        // if (macVersion !== null && +macVersion[1] >= 13) {
        //   platNameSafari = 'safari_itp';
        // }
        // console.log('----------platform   ------- ' + platNameSafari);
        // return platNameSafari;
      // default:
      //   return 'unknown';


  //   if (ua.indexOf('msie') !== -1 || ua.indexOf('trident') !== -1) {
  //     console.log('Internet Explorerをお使いですね');
  //     return 'ie';
  //   } else if (ua.indexOf('edge') !== -1) {
  //     console.log('Edgeをお使いですね');
  //     return 'edge';
  //   } else if (ua.indexOf('chrome') !== -1 && (ua.indexOf('macintosh') === -1 || ua.indexOf('iphone') === -1 || ua.indexOf('ipad') === -1) ) {
  //     console.log('Google Chromeをお使いですね');
  //     return 'chrome';
  //   } else if (ua.indexOf('safari') !== -1 &&  (ua.indexOf('macintosh') !== -1 || ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1)) {
  //     let iosVersion = ua.match(/os (\d{2})_/);
  //     if (iosVersion !== null && +iosVersion[1] >= 11) {
  //       console.log('Safari_itpをお使いですね');
  //       return 'safari_itp';
  //     }

  //     let macVersion = ua.match(/mac os x 10_(\d{2})/);
  //     if (macVersion !== null && +macVersion[1] >= 13) {
  //         console.log('Safari_itpをお使いですね');
  //       return 'safari_itp';
  //     }

  //     console.log('Safariをお使いですね');
  //     return 'safari';
  //   } else if (ua.indexOf('firefox') !== -1) {
  //     console.log('FireFoxをお使いですね');
  //     return 'firefox';
  //   } else if (ua.indexOf('opera') !== -1) {
  //     console.log('Operaをお使いですね');
  //     return 'opera';
  //   } else {
  //     console.log('そんなブラウザは知らん');
  //     return 'unknown';
  //   }
  // };

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


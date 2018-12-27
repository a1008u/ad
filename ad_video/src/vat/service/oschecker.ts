import * as Platform from 'platform';
import 'ts-polyfill/lib/es2017-string';
import 'ts-polyfill/lib/es2015-core';

export namespace oschecker {
  export const isolate = (): string => {
    const osName: String = Platform.os.toString().toLowerCase();
    if (osName.includes('ios')) return 'ios';
    else if (osName.includes('android')) return 'android';
    else if (osName.includes('windows phone')) return 'windowsphone';
    else return 'pc';
  };
}

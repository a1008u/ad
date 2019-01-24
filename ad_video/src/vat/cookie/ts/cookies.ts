/**
 * 目的：cookieの操作を行う
 */
export namespace cookies {
  /**
   * 正規表現を用いて、cookieに[_atpm]が存在しているか確認する
   * @param {string} sKey
   * @returns {boolean}
   */
  export let hasItem = (sKey: string) =>
    new RegExp(
      '(?:^|;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=',
    ).test(document.cookie);

  let getItem = sKey => {
    if (!sKey || !hasItem(sKey)) {
      return null;
    }
    return unescape(
      document.cookie.replace(
        new RegExp(
          '(?:^|.*;\\s*)' +
            escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*',
        ),
        '$1',
      ),
    );
  };

  /**
   * Cookieを取得する
   * @param {string} key
   * @returns {paramjson}
   */
  export let getCookie = (key: string): string => {
    let value: string = getItem(key);
    return value;
  };

  // cookieの有効期限を90日として保持させる
  export let setItem = (
    sKey: string,
    sValue: string,
    deadline: number,
    sPath: string,
    sDomain: string,
    bSecure: boolean,
  ): boolean => {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    let date: Date = new Date();
    date.setDate(date.getDate() + 365);
    document.cookie = `${escape(sKey)}=${escape(sValue)}; path=${
      sPath ? sPath : ''
    }; expires=${date.toUTCString()}${bSecure ? '; secure' : ''}`;
    return true;
  };
}

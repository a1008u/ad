import { Iframe } from './Iframe';
import { IframePreview } from './IframePreview';

import 'ts-polyfill/lib/es2015-promise';

export const exec = (scriptElement: HTMLScriptElement, window: Window) => {
  // スクリプトタグにrkが存在しない場合は、次の「data-atv-rk」を確認する
  const rkValue: string = scriptElement.getAttribute('data-atv-rk');
  const atvMode: string = scriptElement.getAttribute('data-atv-mode');
  const atvMock: string = scriptElement.getAttribute('data-atv-mock');
  if (rkValue || atvMode) {
    scriptElement.removeAttribute('data-atv-rk');
    scriptElement.removeAttribute('data-atv-mode');
    scriptElement.removeAttribute('data-atv-mock');
    const apiDomain: string = atvMock ? 'http://localhost:3000': 'https://h.accesstrade.net';
    const htmlDomain: string = atvMock ? 'http://localhost:3000': 'https://a.image.accesstrade.net/hai';
    if (atvMode) {
      // プレビュー用
      const iframePreview: IframePreview = new IframePreview();
      iframePreview.mainExecPreview(scriptElement, rkValue, window, apiDomain, htmlDomain);
    } else if (rkValue) {
      // 非プレビュー用(プロダクション)
      const iframe = new Iframe();
      iframe.mainExec(scriptElement, rkValue, window, apiDomain, htmlDomain);
    }
  }
};

/**
 * メイン処理
 */
((window, _) => {
  [].forEach.call(document.getElementsByTagName('script'), scriptElement => {
    
    exec(scriptElement, window);
  });
})(window);

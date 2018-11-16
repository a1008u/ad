import { Iframe } from './Iframe';
require('es6-promise').polyfill();
import 'babel-polyfill';
import { IframePreview } from './IframePreview';

export const mkfadeIn = () => {
  const css = document.createElement('style');
  css.media = 'screen';
  css.type = 'text/css';
  // フェードイン
  const fadein = `@keyframes fadeIn{${[
    '0% {opacity: 0}',
    '100% {opacity: 1.0}',
  ].join(' ')}`;
  // ルールをstyleタグに追加
  const rules = document.createTextNode(fadein);
  css.appendChild(rules);
  // head内に作成
  document.getElementsByTagName('head')[0].appendChild(css);
};

export const exec = (scriptElement: any, window: Window) => {
  // スクリプトタグにrkが存在しない場合は、次の「data-atv-rk」を確認する
  const rkValue: string = scriptElement.getAttribute('data-atv-rk');
  const atvMode: string = scriptElement.getAttribute('data-atv-mode');
  const atvMock: string = scriptElement.getAttribute('data-atv-mock');
  if (rkValue || atvMode) {
    scriptElement.removeAttribute('data-atv-rk');
    scriptElement.removeAttribute('data-atv-mode');
    scriptElement.removeAttribute('data-atv-mock');
    const domain = atvMock ? 'http://localhost:3000' : 'https://h.accesstrade.net';
    if (atvMode) {
      // プレビュー用
      const iframePreview: IframePreview = new IframePreview();
      iframePreview.mainExecPreview(scriptElement, rkValue, window, domain);
    } else if (rkValue) {
      // 非プレビュー用
      const iframe = new Iframe();
      iframe.mainExec(scriptElement, rkValue, window, domain);
    }
  }
};

/**
 * メイン処理
 */
((window, _) => {
  [].forEach.call(document.getElementsByTagName('script'), scriptElement => {
    // styleタグを作成
    mkfadeIn();
    exec(scriptElement, window);
  });
})(window);

import { Iframe } from './Iframe';

/**
 * メイン処理
 */
((window, _) => {
  [].forEach.call(document.getElementsByTagName('script'), scriptElement => {
    // スクリプトタグにrkが存在しない場合は、次の「data-atv-rk」を確認する
    const rkValue: string = scriptElement.getAttribute('data-atv-rk');
    const atvMode: string = scriptElement.getAttribute('data-atv-mode');
    const atvExec: string = scriptElement.getAttribute('data-atv-exec');

    if (rkValue || atvMode) {
      scriptElement.removeAttribute('data-atv-rk');
      scriptElement.removeAttribute('data-atv-mode');
      scriptElement.removeAttribute('data-atv-exec');

      const iframe = new Iframe();
      if (atvMode) {
        // プレビュー用
        iframe.mainExecPreview(scriptElement, rkValue, window, atvExec);
      } else if (rkValue) {
        // 非プレビュー用
        iframe.mainExec(scriptElement, rkValue, window, atvExec);
      }
    }
  });
})(window);

import axios from 'axios';
import { Jsontype } from '../../../service/class/jsontype';

/**
 * impのアクセス条件
 *  impアクセスが未実施かつpreviewモードでない場合に実施
 *  実施後はimpが付与される(再実施防止用)
 */
export namespace ImpService {
  export const execImp = (
    videoElement: HTMLVideoElement,
    atvJson: Jsontype,
  ) => {
    const imp: string = videoElement.getAttribute('imp');
    const atvMode: string = videoElement.getAttribute('atv_mode');
    if (!imp && !atvMode) {
      videoElement.setAttribute('imp', 'done');
      axios
        .get(atvJson.impression_url)
        .then(resdata => resdata.data)
        .catch(err => err);
    }
  };
}

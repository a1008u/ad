import axios from 'axios';
import { Jsontype } from '../../../service/jsontype';

export namespace ImpService {
  export const execImp = (videoElement: HTMLVideoElement, atvJson: Jsontype) => {
    let imp: string = videoElement.getAttribute('imp');
    let atvMode: string = videoElement.getAttribute('atv_mode');
    if (!imp && !atvMode) {
      videoElement.setAttribute('imp', 'done');
      console.log(' ====== imp用 軌道 ======');
      axios
        .get(atvJson.impression_url)
        .then(resdata => resdata.data)
        .catch(err => console.log(err));
    }
  }

}
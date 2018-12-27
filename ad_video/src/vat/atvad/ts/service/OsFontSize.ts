import { OSFontsize } from '../../../service/interface/OS';

export namespace osFontSize {
  export const getSize: OSFontsize = {
    ios: () => ['16px', '12px', '5px', '10px'],
    android: () => ['16px', '12px', '5px', '10px'],
    windowsphone: () => ['16px', '12px', '5px', '10px'],
    pc: () => ['22px', '20px', '10px', '20px'],
  };
}

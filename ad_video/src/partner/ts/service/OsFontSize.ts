export namespace osFontSize {
  export const getSize: OSFontsize = {
    ios: () => {return ['16px', '12px'];}
    , android: () => {return ['16px', '12px'];}
    , windowsphone: () => {return ['16px', '12px'];}
    , pc: () => {return ['28px', '24px']; }
  };
}

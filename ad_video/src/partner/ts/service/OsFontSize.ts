export namespace osFontSize {
  export const getSize: OSFontsize = {
    ios: () => { return ['16px', '12px'];}
    , android: () => {return ['28px', '24px'];}
    , windowsphone: () => {return ['28px', '24px'];}
    , pc: () => {return ['28px', '24px']; }
  };
}

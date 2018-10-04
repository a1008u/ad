export namespace osFontSize {
  export const getSize: OSFontsize = {
    ios: () => {return ['16px', '12px', '5px', '10px'];}
    , android: () => {return ['16px', '12px', '5px', '10px'];}
    , windowsphone: () => {return ['16px', '12px', '5px', '10px'];}
    , pc: () => {return ['28px', '24px', '10px', '20px']; }
  };
}

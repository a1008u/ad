export namespace osFontSize {
  export const getSize: OSFontsize = {
    ios: (divTextLeftElement, divTextRightElement) => {
      return ['16px', '12px'];
    },
    android: (divTextLeftElement, divTextRightElement) => {
      return ['28px', '24px'];
    },
    windowsphone: (divTextLeftElement, divTextRightElement) => {
      return ['28px', '24px'];
    },
    pc: (divTextLeftElement, divTextRightElement) => {
      return ['28px', '24px'];
    },
  };
}

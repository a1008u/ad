import * as Platform from 'platform';

export namespace oschecker {
    export const isolate = (): string => {
        const osName: string = Platform.os.toString().toLowerCase();
        if (osName.includes('ios')) return 'ios';
        else if (osName === 'android') return 'android';
        else if (osName === 'windows phone') return 'windowsphone';
        else return 'pc';
    };
}

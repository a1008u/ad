import {dimension} from "./model/dimension";
import {position} from "./model/position";

namespace advideo{

    const getWindowDimensions = () : dimension =>  {
        const doel: HTMLElement = document.documentElement;
        return (window.pageYOffset !== undefined) ? {
                    scrollTop: window.pageYOffset,
                    scrollLeft: window.pageXOffset,
                    height:window.innerHeight,
                    width:window.innerWidth
                } : {
                    scrollTop: doel.scrollTop,
                    scrollLeft: doel.scrollLeft,
                    height:doel.clientHeight,
                    width: doel.clientWidth
                };
    };

    const getPosition = (videoTag: HTMLVideoElement) : position=> {
        let left: number = 0;
        let top: number = 0;
        while (videoTag && videoTag.offsetParent) {
            left += videoTag.offsetLeft;
            top += videoTag.offsetTop;
            videoTag = <HTMLVideoElement>videoTag.offsetParent;
        }
        return { top:top, left:left };
    };

    const ckViewStatus= (videoTag: HTMLVideoElement) : boolean  => {
        const winDimension: dimension = getWindowDimensions();
        const pos: position = getPosition(videoTag);

        //return pos.top >= win.scrollTop && pos.top <= win.scrollTop + win.height;
        // 条件：画面全体 >=
        return winDimension.scrollTop + winDimension.height >= pos.top + videoTag.height
            && winDimension.scrollTop <= pos.top;
    };

    export let mkvideo = () : void => {

        [].forEach.call(document.getElementsByTagName('script'), script => {

            let rk: string= script.getAttribute('data-atv-rk');

            // rkチェック
            if (!(rk !== null && rk === '' && rk === ' ')) {
                return;
            }


            const aTag: HTMLAnchorElement = document.createElement('a');
            aTag.href = `click?rk=${rk}`;
            aTag.target = "_blank";

            const videoTag: HTMLVideoElement = document.createElement('video');
            videoTag.height = script.getAttribute('data-atv-height');
            videoTag.width = script.getAttribute('data-atv-width');
            videoTag.src = script.getAttribute('data-atv-src');
            videoTag.muted = true;
            videoTag.loop = true;
            videoTag.setAttribute('playsinline', 'playsinline');
            videoTag.setAttribute('data-vda-video', rk);
            aTag.appendChild(videoTag);


            script.parentNode.insertBefore(aTag, script);

            if (ckViewStatus(videoTag)) {
                videoTag.play();
            }

        });

    }

}


// 即時実行
((window, _) => {
    advideo.mkvideo();
})(window);


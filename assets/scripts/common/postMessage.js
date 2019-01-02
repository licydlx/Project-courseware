
console.log('postMessage');

// 页面数
window.parent.postMessage(
    JSON.stringify({ method: 'onPagenum', totalPages: 17 }),
    '*'
);

// 屏幕分辨率
window.parent.postMessage(
    JSON.stringify({
        method: 'onLoadComplete',
        coursewareRatio: 16 / 9,
    }),
    '*'
);

// 页面seq
window.CUR_PAGE_SEQ = 0;

window.addEventListener("message", function (e) {

    console.log('postMessage -- addEventListener');
    var data = JSON.parse(e.data);
    if (data) {
        switch (data.method) {
            // 上一页
            case "onPageup":
                console.log('onPageup');
                break;
            case "onPagedown":
                console.log('onPagedown');
                break;
            case "onJumpPage":
                console.log('onJumpPage');
                console.log(data.toPage);
                window.CUR_PAGE_SEQ = parseInt(data.toPage) - 1;
                console.log(window.CUR_PAGE_SEQ);

                break;

            case 'onFileMessage':
                if (data.handleData && data.handleData.isDocument) {
                    let triggerEle = document;
                    var ev = document.createEvent('HTMLEvents');
                    ev.initEvent(
                        data.handleData.eventType,
                        false,
                        true
                    );
                    ev.clientX =
                        (data.handleData.clientX *
                            window.innerWidth) /
                        data.handleData.width;
                    ev.clientY =
                        (data.handleData.clientY *
                            window.innerHeight) /
                        data.handleData.height;
                    //添加是否主动属性,防止死循环
                    const externalData = { isInitiative: false };
                    ev.externalData = externalData;
                    //触发事件
                    triggerEle.dispatchEvent(ev)
                }

                break;
        }

    }
})

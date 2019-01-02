
cc.Class({
    extends: cc.Component,

    properties: {
        webview: {
            default: [],
            type: [cc.WebView]
        },

        reloadTxt: {
            default: [],
            type: [cc.Label]
        },

        reloadState: false,

        url: 'https://res.miaocode.com/h5/scratch/index.html#84563',

        wvOne: false,
        wvTwo: false,
        wvThree: false,
        wvFour: false
    },

    onLoad: function () {
        console.log('webviewControl');
        var that = this;
        // webview 通信
        window.addEventListener("message", function (e) {
            if (typeof e.data !== 'string') return;
            var data = JSON.parse(e.data);
            console.log('webviewControl - addEventListener');
            if (data) {
                switch (data.method) {
                    case 'onFileMessage':

                        break;

                    // 学生端 向 iframe 小游戏 发消息
                    case 'onGameEvent':
                        window.parent.postMessage(
                            JSON.stringify({
                                method: 'onFileMessage',
                                handleData: data,
                            }),
                            '*'
                        );
                        break;

                    // 学生端 向 iframe 积木 发消息
                    case 'onBlockEvent':
                        window.parent.postMessage(
                            JSON.stringify({
                                method: 'onFileMessage',
                                handleData: data,
                            }),
                            '*'
                        );
                        break;
                }
            }
        })
    },

    // webview 監聽事件
    onWebFinishLoad: function (target, event, customEventData) {
        var that = this;
        if (event === cc.WebView.EventType.LOADED) {

            console.log('LOADED');
            this.reloadTxt[customEventData].string = '加载';

            if (target.url == 'https://kunqu.tech/images/index.html' && that.reloadState) {
                that.reload(target, customEventData, 'https://res.miaocode.com/h5/scratch/index.html#84563');
            }

            // scrath game 顯示
            if (customEventData == 0) {
                that.webview[customEventData].node.width = 240;
            }

            // 加載完成後 綁定多端通信事件
            if (target.url !== 'https://kunqu.tech/images/index.html') {
                that.reloadState = false;
                that.gamePost(target, event, customEventData);
            }

        } else if (event === cc.WebView.EventType.LOADING) {
            console.log('LOADING');
            this.reloadTxt[customEventData].string = '加载ing';
        } else if (event === cc.WebView.EventType.ERROR) {
            console.log('ERROR');
            this.reloadTxt[customEventData].string = '加载失败';
        }
    },

    gamePost(target, event, customEventData) {
        var that = this;
        var seq = parseInt(customEventData);

        if (!that.wvOne && seq == 0) {
            console.log('wvOne');
            window.addEventListener("message", function (e) {
                if (typeof e.data !== 'string') return;
                var data = JSON.parse(e.data);
                if (data) {
                    switch (data.method) {
                        case 'onFileMessage':
                            if (data.handleData && data.handleData.method === 'onGameEvent') {
                                target._impl._iframe.contentWindow.postMessage(
                                    JSON.stringify(data.handleData),
                                    '*'
                                )
                                that.wvOne = true;
                            }
                            break
                    }
                    
                }
            })
        }

        if (!that.wvTwo && seq == 1) {
            console.log('wvTwo');
            window.addEventListener("message", function (e) {
                if (typeof e.data !== 'string') return;
                var data = JSON.parse(e.data);
                if (data) {
                    switch (data.method) {
                        case 'onFileMessage':
                            if (data.handleData && data.handleData.method === 'onGameEvent') {
                                target._impl._iframe.contentWindow.postMessage(
                                    JSON.stringify(data.handleData),
                                    '*'
                                )
                                that.wvTwo = true;
                            }

                            break
                    }
                }
            })
        }

        if (!that.wvThree && seq == 2) {
            window.addEventListener("message", function (e) {
                if (typeof e.data !== 'string') return;
                var data = JSON.parse(e.data);
                if (data) {
                    switch (data.method) {
                        case 'onFileMessage':
                            if (data.handleData && data.handleData.method === 'onGameEvent') {
                                target._impl._iframe.contentWindow.postMessage(
                                    JSON.stringify(data.handleData),
                                    '*'
                                )
                                that.wvThree = true;
                            }
                            break
                    }
                    
                }
            })
        }

        if (!that.wvFour && seq == 3) {
            window.addEventListener("message", function (e) {
                if (typeof e.data !== 'string') return;
                var data = JSON.parse(e.data);

                if (data) {
                    switch (data.method) {
                        case 'onFileMessage':
                            if (data.handleData && data.handleData.method === 'onBlockEvent') {
                                target._impl._iframe.contentWindow.postMessage(
                                    JSON.stringify(data),
                                    '*'
                                )
                                that.wvFour = true;
                            }
                            break
                    }
                }
            })
        }

    },

    // 重新加載
    reload(event, seq, url) {
        console.log('reload');
        this.reloadState = true;
        var seq = parseInt(seq);
        var wvUrl = this.webview[seq];

        if (url) {
            wvUrl.url = url;
        } else {
            // wvUrl.url = this.url;
            // this.url = '';
            wvUrl.url = 'https://kunqu.tech/images/index.html';
        }
    },

    // 重載通信
    reloadPost() {
        // if (window !== window.parent) {
        //     let data = JSON.stringify({
        //         method: 'onFileMessage',
        //         handleData: {
        //             type: 'reloadGame'
        //         },
        //     });
        //     window.parent.postMessage(data, '*');
        // }
    }


    // update (dt) {},
});

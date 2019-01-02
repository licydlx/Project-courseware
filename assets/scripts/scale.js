cc.Class({
    extends: cc.Component,

    properties: {
        answerList: {
            default: [],
            type: [cc.Node]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() { },

    start() {
        var that = this;
        window.addEventListener('message', function (e) {
            if (window === window.parent) return;
            if (typeof e.data !== 'string') return;
            var data = JSON.parse(e.data);

            if (data) {
                switch (data.method) {
                    case "onFileMessage":
                        if (data.handleData && data.handleData.type == 'SCALE') {
                            that.answerList[data.handleData.seqNum].scale = data.handleData.size;
                        }
                }
            }
        }, false);

        var flag = true;

        that.answerList.forEach(function (x, y) {

            x.on('touchstart', function (event) {
                var seqNum = y;
                if (flag) {
                    flag = false;
                    event.currentTarget.scale = event.currentTarget.scale == 0.4 ? 0.8 : 0.4;

                    if (window !== window.parent) {
                        let data = JSON.stringify({
                            method: 'onFileMessage',
                            handleData: {
                                type: 'SCALE',
                                size: event.currentTarget.scale,
                                seqNum: seqNum
                            },
                        });
                        window.parent.postMessage(data, '*');
                        flag = true;
                    }
                }

            });
        });
    },

    // update (dt) {},
});

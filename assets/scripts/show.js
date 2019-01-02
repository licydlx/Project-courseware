cc.Class({
    extends: cc.Component,

    properties: {
        showList: {
            default: [],
            type: [cc.Node]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        var that = this;
        window.addEventListener('message', function (e) {
            if (window === window.parent) return;
            if (typeof e.data !== 'string') return;
            var data = JSON.parse(e.data);

            if (data) {
                switch (data.method) {
                    case "onFileMessage":
                        if (data.handleData && data.handleData.type == 'SHOW') {
                            var seq = parseInt(data.handleData.seq);
                            if (!that.showList[seq].active) that.showList[seq].active = true;
                        }
                }
            }
        }, false);
    },

    show(event, pars) {
        var seq = parseInt(pars);
        if (!this.showList[seq].active) this.showList[seq].active = true;

        if (window !== window.parent) {
            let data = JSON.stringify({
                method: 'onFileMessage',
                handleData: {
                    type: 'SHOW',
                    seq: seq
                },
            });
            window.parent.postMessage(data, '*');

        }
    }

    // update (dt) {},
});

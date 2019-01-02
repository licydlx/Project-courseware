cc.Class({
    extends: cc.Component,

    properties: {
        editBox: {
            default: [],
            type: [cc.EditBox]
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('editArea');
    },

    start () {
        var that = this;
        window.addEventListener('message', function (e) {
            if (window === window.parent) return;
            if (typeof e.data !== 'string') return;
            var data = JSON.parse(e.data);

            if (data) {
                switch (data.method) {
                    case "onFileMessage":
                        if (data.handleData && data.handleData.type == 'editArea') {
                            that.editBox[data.handleData.seq].string = data.handleData.text;
                        }
                }
            }
        }, false);
        
        this.editBox.forEach(function(x,y){
            x.node.on('text-changed',function(e){
                var seq = y;
                var text = e.string

                if (window !== window.parent) {
                    let data = JSON.stringify({
                        method: 'onFileMessage',
                        handleData: {
                            type: 'editArea',
                            text:text,
                            seq: seq
                        },
                    });
                    window.parent.postMessage(data, '*');
                }

            }, this);
        })


    }

});

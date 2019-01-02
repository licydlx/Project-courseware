cc.Class({
    extends: cc.Component,

    properties: {
        learnReport:{
            default:null,
            type:cc.Node
        },

        showBoxList:{
            default:[],
            type:[cc.Node]
        }
    },

    onLoad () {
        var that = this;

        that.boxSeq = 0;

        window.addEventListener('message', function (e) {
            if (window === window.parent) return;
            if (typeof e.data !== 'string') return;
            var data = JSON.parse(e.data);

            if (data) {
                switch (data.method) {
                    case "onFileMessage":
                        if (data.handleData && data.handleData.type == 'prevBox') {
                            that.prevBox('children');
                        } else if (data.handleData && data.handleData.type == 'nextBox'){
                            that.nextBox('children');
                        } else if (data.handleData && data.handleData.type == 'openBox'){
                            that.openBox('children');
                        } else if (data.handleData && data.handleData.type == 'closeBox'){
                            that.closeBox('children');
                        }
                }
            }
        }, false);
    },

    // 上一页
    prevBox(event,pars){
        var seq = parseInt(this.boxSeq);
        if(seq == 0) return;
        this.showBoxList[seq].active = false;
        seq--;
        this.boxSeq = seq;
        this.showBoxList[seq].active = true;

        if(pars == 'parent'){
            this.boxState('prevBox');
        }
    },

    // 下一页
    nextBox(event,pars){
        var seq = parseInt(this.boxSeq);
        if(seq == 3) return;
        this.showBoxList[seq].active = false;
        seq++;
        this.boxSeq = seq;
        this.showBoxList[seq].active = true;
        if(pars == 'parent'){
            this.boxState('nextBox');
        }
    },

    openBox(event,pars){
        this.learnReport.height = 540;
        if(pars == 'parent'){
            this.boxState('openBox');
        }
    },

    closeBox(event,pars){
        this.learnReport.height = 0;
        
        if(pars == 'parent'){
            this.boxState('closeBox');
        }
    },

    boxState(type){
        if (window !== window.parent) {
            let data = JSON.stringify({
                method: 'onFileMessage',
                handleData: {
                    type: type,
                },
            });
            window.parent.postMessage(data, '*');
        }
    }
    // update (dt) {},
});

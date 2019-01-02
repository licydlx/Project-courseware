cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.PageView,
        label: cc.Label,

        webviewControl:{
            default:null,
            type:cc.Node
        },

        scrathGames:{
            default: [],
            type: [cc.WebView]
        },

        learnBox:{
            default: [],
            type: [cc.Node]
        }


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log('pageViewControl');
        console.log(this.target);

        var curPageNode = this.target.content.children[CUR_PAGE_SEQ].getChildByName("learnBox");
        if(curPageNode && !curPageNode.active) {
            curPageNode.active = true;
        }
    },

    update(dt) {
        // 更新页面
        var cps = this.target.getCurrentPageIndex();
        if(CUR_PAGE_SEQ !== cps){
            console.log('update');
            // console.log(cps);
            // console.log(CUR_PAGE_SEQ);
            // if(this.target.content.children[CUR_PAGE_SEQ] && !this.target.content.children[CUR_PAGE_SEQ].active){
            //     this.target.content.children[CUR_PAGE_SEQ].active = true;
            // }
            this.target.scrollToPage(CUR_PAGE_SEQ);
        }
    },

    // 监听事件
    onPageEvent(sender, eventType) {
        console.log('onPageEvent');
        console.log(sender);

        // 翻页事件
        if (eventType !== cc.PageView.EventType.PAGE_TURNING) {
            return;
        }
        var curPageNode = sender.content.children[CUR_PAGE_SEQ].getChildByName("learnBox");
        if(curPageNode && !curPageNode.active) {
            console.log('设置actvie');
            curPageNode.active = true;

            // if(CUR_PAGE_SEQ == 2){
            //     console.log(this.scrathGames[0]);
            //     this.scrathGames[0].active = true;
            //     this.webviewBind(0);
            // } else if(CUR_PAGE_SEQ == 7){
            //     console.log(this.scrathGames[1]);
            //     this.scrathGames[1].active = true;
            //     this.webviewBind(1);
            // } else if(CUR_PAGE_SEQ == 12){
            //     console.log(this.scrathGames[2]);
            //     this.scrathGames[2].active = true;
            //     this.webviewBind(2);
            // }
        }

        // console.log(curPageNode);

        // if(this.target.content.children[CUR_PAGE_SEQ] && !this.target.content.children[CUR_PAGE_SEQ + 1].active){
        //     this.target.content.children[CUR_PAGE_SEQ + 1].active = true;
        // }

    }

});

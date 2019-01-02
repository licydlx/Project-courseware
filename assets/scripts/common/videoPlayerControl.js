cc.Class({
    extends: cc.Component,
    properties: {
        boxList: {
            default: [],
            type: [cc.Node]
        },

        itemList: {
            default: [],
            type: [cc.VideoPlayer]
        },

        itemBackground: {
            default: null,
            type: cc.Node
        },

        videoNum: 0
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        console.log('videoPlayerControl');
        var that = this;
        window.addEventListener('message', function (e) {
            if (window === window.parent) return;
            if (typeof e.data !== 'string') return;
            var data = JSON.parse(e.data);

            if (data) {
                switch (data.method) {
                    case "onFileMessage":

                        if (data.handleData.customEventData || data.handleData.customEventData == 0) {
                            var customEventData = parseInt(data.handleData.customEventData);
                            that.videoNum = customEventData;
                        }

                        if (data.handleData && data.handleData.type == 'PLAYING') {

                            if (that.itemList[customEventData]) {
                                that.itemList[customEventData].play();
                            } else {
                                console.error(that.itemList);
                            }

                        } else if (data.handleData && data.handleData.type == 'PAUSED') {
                            if (!that.itemList[customEventData]) {
                                console.error(that.itemList);
                            } else if (!that.boxList[customEventData]) {
                                console.error(that.boxList);
                            } else {
                                that.itemList[customEventData].pause();

                                if (that.itemBackground.height < 540) {
                                    that.itemBackground.height = 540;
                                    that.itemBackground.opacity = 255;
                                    that.boxList[customEventData].height = 240;
                                }
                            }
                        } else if (data.handleData && data.handleData.type == 'STOPPED') {

                            if (!that.itemList[customEventData]) {
                                console.error(that.itemList);
                            } else if (!that.boxList[customEventData]) {
                                console.error(that.boxList);
                            } else {
                                if (that.itemBackground.height !== 0) {
                                    that.itemList[customEventData].stop();
                                    that.itemBackground.height = 0;
                                    that.itemBackground.opacity = 0;
                                    that.boxList[customEventData].height = 0;
                                }
                            }
                        }
                }
            }
        }, false);
    },

    start() {

    },

    onVideoPlayerEvent(videoplayer, eventType, customEventData) {
        console.log('onVideoPlayerEvent');
        var type;
        this.videoNum = parseInt(customEventData);
        // videoplayer暂停
        if (eventType === cc.VideoPlayer.EventType.PAUSED) {
            type = 'PAUSED';

            console.log('PAUSED');
            if (this.itemBackground.height < 540) {
                this.itemBackground.height = 540;
                this.itemBackground.opacity = 255;
                this.boxList[this.videoNum].height = 240;
            }

            this.postStudent(type, this.videoNum);
        }

        // videoplayer关闭
        if (eventType === cc.VideoPlayer.EventType.STOPPED) {
            type = 'STOPPED';

            if (this.itemBackground.height !== 0) {
                this.itemList[this.videoNum].stop();
                this.itemBackground.height = 0;
                this.itemBackground.opacity = 0;
                this.boxList[this.videoNum].height = 0;
            } else {
                return;
            }

            this.postStudent(type, this.videoNum);
        }

        // videoplayer正在播放状态
        if (eventType === cc.VideoPlayer.EventType.PLAYING) {
            type = 'PLAYING';
            this.postStudent(type, this.videoNum);
        }
    },

    postStudent(type, customEventData) {
        console.log('postStudent');

        if (window !== window.parent) {
            let data = JSON.stringify({
                method: 'onFileMessage',
                handleData: {
                    type: type,
                    customEventData: customEventData
                },
            });
            window.parent.postMessage(data, '*');
        }
    },

    // 关闭
    videoPlayerClose() {
        console.log('videoPlayerClose');
        this.itemList[this.videoNum].stop();

    },

    // 播放
    videoPlayerPlay() {
        console.log('videoPlayerPlay');
        this.itemList[this.videoNum].play();
    },

    // 暂停
    videoPlayerPause() {
        console.log('videoPlayerPause');
        this.itemList[this.videoNum].pause();
    },

    // 继续播放
    videoPlayerResume() {
        console.log('videoPlayerResume');
        this.itemList[this.videoNum].resume();
    },

    // 初始化暂停
    initPause(event, pars) {
        var vp = this.itemList[parseInt(pars)].getComponent(cc.VideoPlayer)
        vp.onPasued();
    }

    // update (dt) {},
});

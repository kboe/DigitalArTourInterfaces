var World = {

    init: function initFn() {
        this.createOverlays();
    },

    createOverlays: function createOverlaysFn() {

        this.tracker = new AR.ClientTracker("assets/tracker.wtc");
        var fuerstVideo = new AR.VideoDrawable("assets/Fuerst.mp4",1,{
            isTransparent=true
        })
        
        fuerstVideo.play(1);
        fuerstVideo.pause();
        var fuerst = new AR.Trackable2DObject(this.tracker,"marker20",{
            drawables:{
                cam: fuerstVideo
            },
            onEnterFieldOfVision:function(){
                fuerstVideo.resume();
            },
            onExitFieldOfVision:function(){
                fuerstVideo.pause();
            }
        });
        
        

    }
};



World.init();

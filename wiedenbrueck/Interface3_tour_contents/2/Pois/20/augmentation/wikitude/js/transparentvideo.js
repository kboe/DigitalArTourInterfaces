var World = {

	init : function initFn() {
		this.createOverlays();
	},

	createOverlays : function createOverlaysFn() {
		this.tracker = new AR.ClientTracker("assets/tracker.wtc");
		var trackableBasis = new AR.Trackable2DObject(this.tracker, "*", {
				onEnterFieldOfVision : function (name) {
					//document.location = "architectsdk://modelontarget_"+name;
					document.location = "architectsdk://" + name;
				},
				onExitFieldOfVision : function () {
					document.location = "architectsdk://exit";
					//document.location = "architectsdk://modelexittarget_"+name;
				}
			});

		var videoBruderMartin = new AR.VideoDrawable("assets/bruderMartin.mp4", 0.75, {
				offsetX : 0,
				offsetY : -0.41,
				isTransparent : true,
				onPlaybackStarted : function () {
					document.location = "architectsdk://contentStarted_video";
				},
				onFinishedPlaying : function () {
					document.location = "architectsdk://contentStopped_video";
				}
			});

		videoBruderMartin.play(1);
		videoBruderMartin.pause();
		document.location = "architectsdk://contentStopped_video";

		this.trackableBruderMartin = new AR.Trackable2DObject(this.tracker, "marker20", {
				drawables : {
					cam : [videoBruderMartin]
				},
				onEnterFieldOfVision : function onEnterFieldOfVisionFn() {
					videoBruderMartin.resume();
					document.location = "architectsdk://contentStarted_video";
				},
				onExitFieldOfVision : function onExitFieldOfVisionFn() {
					videoBruderMartin.pause();
					document.location = "architectsdk://contentStopped_video";
				}
			});
	
		var videoInfotext = new AR.VideoDrawable("assets/Dialog_wiki.mp4", 0.94, {
			offsetX : 0,
			offsetY : 0.30,
			isTransparent: true
		});

		videoInfotext.play(-1);
		videoInfotext.pause();

		this.trackableInfotext = new AR.Trackable2DObject(this.tracker, "marker20", {
			drawables: {
				cam: [videoInfotext]
			},
			onEnterFieldOfVision: function onEnterFieldOfVisionFn() {
				videoInfotext.resume();
			},
			onExitFieldOfVision: function onExitFieldOfVisionFn() {
				videoInfotext.pause();
			}
		});
		this.trackableInfotext.enabled=false;
	},

	switchContentToInfo: function switchContentToInfoFn(){
			for(i=0; i<World.trackableBruderMartin.drawables.cam.length; i++){
				if(AR.VideoDrawable.prototype.isPrototypeOf(World.trackableBruderMartin.drawables.cam[i])){
					World.trackableBruderMartin.drawables.cam[i].pause();
				}
			}
			World.trackableInfotext.enabled = true;
			World.trackableBruderMartin.enabled = false;
	},

	switchContentToAR: function switchContentToARFn(){
			for(i=0; i<World.trackableBruderMartin.drawables.cam.length; i++){
				if(AR.VideoDrawable.prototype.isPrototypeOf(World.trackableBruderMartin.drawables.cam[i])){
					World.trackableBruderMartin.drawables.cam[i].resume();
				}
			}
			World.trackableInfotext.enabled = false;
			World.trackableBruderMartin.enabled = true;
	},
	turnEverythingOff: function turnEverythingOffFn(){
			for(i=0; i<World.trackableBruderMartin.drawables.cam.length; i++){
				if(AR.VideoDrawable.prototype.isPrototypeOf(World.trackableBruderMartin.drawables.cam[i])){
					World.trackableBruderMartin.drawables.cam[i].pause();
				}
			}
			World.trackableInfotext.enabled = false;
			World.trackableBruderMartin.enabled = false;
    }
};

World.init();

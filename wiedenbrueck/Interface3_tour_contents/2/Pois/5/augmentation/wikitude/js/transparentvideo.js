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

		var video = new AR.VideoDrawable("assets/schulordnung.mp4", 2.3, {
				offsetX : 0,
				offsetY : 0.30,
				isTransparent : true,
				onPlaybackStarted : function () {
					document.location = "architectsdk://contentStarted_video";
				},
				onFinishedPlaying : function () {
					document.location = "architectsdk://contentStopped_video";
				}
			});

		video.play(-1);
		video.pause();
		document.location = "architectsdk://contentStopped_video";

		this.trackableMarker5 = new AR.Trackable2DObject(this.tracker, "marker5", {
				drawables : {
					cam : [video]
				},
				onEnterFieldOfVision : function onEnterFieldOfVisionFn() {
					video.resume();
					document.location = "architectsdk://contentStarted_video";
				},
				onExitFieldOfVision : function onExitFieldOfVisionFn() {
					video.pause();
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

		this.trackableInfotext = new AR.Trackable2DObject(this.tracker, "*", {
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
			for(i=0; i<World.trackableMarker5.drawables.cam.length; i++){
				if(AR.VideoDrawable.prototype.isPrototypeOf(World.trackableMarker5.drawables.cam[i])){
					World.trackableMarker5.drawables.cam[i].pause();
				}
			}
			World.trackableInfotext.enabled = true;
			World.trackableMarker5.enabled = false;
	},

	switchContentToAR: function switchContentToARFn(){
			for(i=0; i<World.trackableMarker5.drawables.cam.length; i++){
				if(AR.VideoDrawable.prototype.isPrototypeOf(World.trackableMarker5.drawables.cam[i])){
					World.trackableMarker5.drawables.cam[i].resume();
				}
			}
			World.trackableInfotext.enabled = false;
			World.trackableMarker5.enabled = true;
	},
	turnEverythingOff: function turnEverythingOffFn(){
			for(i=0; i<World.trackableMarker5.drawables.cam.length; i++){
				if(AR.VideoDrawable.prototype.isPrototypeOf(World.trackableMarker5.drawables.cam[i])){
					World.trackableMarker5.drawables.cam[i].pause();
				}
			}
			World.trackableInfotext.enabled = false;
			World.trackableMarker5.enabled = false;
    }
};

World.init();

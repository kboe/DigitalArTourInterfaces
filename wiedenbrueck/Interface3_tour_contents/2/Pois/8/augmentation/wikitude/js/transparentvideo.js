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

		var videoStreit = new AR.VideoDrawable("assets/streit.mp4", 0.95, {
				offsetX : 0.65,
				offsetY : -0.84,
				isTransparent : true,
				onPlaybackStarted : function () {
					document.location = "architectsdk://contentStarted_video";
				},
				onFinishedPlaying : function () {
					document.location = "architectsdk://contentStopped_video";
				}
			});

		videoStreit.play(1);
		videoStreit.pause();
		document.location = "architectsdk://contentStopped_video";

		this.trackableStreit = new AR.Trackable2DObject(this.tracker, "marker8", {
				drawables : {
					cam : [videoStreit]
				},
				onEnterFieldOfVision : function onEnterFieldOfVisionFn() {
					videoStreit.resume();
					document.location = "architectsdk://contentStarted_video";
				},
				onExitFieldOfVision : function onExitFieldOfVisionFn() {
					videoStreit.pause();
					document.location = "architectsdk://contentStopped_video";
				}
			});

		this.trackableStreit_1 = new AR.Trackable2DObject(this.tracker, "marker8_1", {
				drawables : {
					cam : [videoStreit]
				},
				onEnterFieldOfVision : function onEnterFieldOfVisionFn() {
					videoStreit.resume();
					document.location = "architectsdk://contentStarted_video";
				},
				onExitFieldOfVision : function onExitFieldOfVisionFn() {
					videoStreit.pause();
					document.location = "architectsdk://contentStopped_video";
				}
			});
	
	var videoInfotext = new AR.VideoDrawable("assets/Dialog_wiki.mp4", 0.94, {
			offsetX : 0.65,
			offsetY : -0.84,
			isTransparent: true
		});

		videoInfotext.play(-1);
		videoInfotext.pause();

		this.trackableInfotext = new AR.Trackable2DObject(this.tracker, "marker8", {
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
			for(i=0; i<World.trackableStreit.drawables.cam.length; i++){
				if(AR.VideoDrawable.prototype.isPrototypeOf(World.trackableStreit.drawables.cam[i])){
					World.trackableStreit.drawables.cam[i].pause();
					World.trackableStreit_1.drawables.cam[i].pause();
				}
			}
			World.trackableInfotext.enabled = true;
			World.trackableStreit.enabled = false;
			World.trackableStreit_1.enabled = false;
	},

	switchContentToAR: function switchContentToARFn(){
			for(i=0; i<World.trackableStreit.drawables.cam.length; i++){
				if(AR.VideoDrawable.prototype.isPrototypeOf(World.trackableStreit.drawables.cam[i])){
					World.trackableStreit.drawables.cam[i].resume();
					World.trackableStreit_1.drawables.cam[i].resume();
				}
			}
			World.trackableInfotext.enabled = false;
			World.trackableStreit.enabled = true;
			World.trackableStreit_1.enabled = true;
	},
	turnEverythingOff: function turnEverythingOffFn(){
			for(i=0; i<World.trackableStreit.drawables.cam.length; i++){
				if(AR.VideoDrawable.prototype.isPrototypeOf(World.trackableStreit.drawables.cam[i])){
					World.trackableStreit.drawables.cam[i].pause();
					World.trackableStreit_1.drawables.cam[i].pause();
				}
			}
			World.trackableInfotext.enabled = false;
			World.trackableStreit.enabled = false;
			World.trackableStreit_1.enabled = false;
    }
};

World.init();

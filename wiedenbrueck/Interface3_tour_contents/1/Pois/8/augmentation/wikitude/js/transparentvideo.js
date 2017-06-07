var World = {

	init : function initFn() {
		this.createOverlays();
	},

	createOverlays : function createOverlaysFn() {
		this.tracker = new AR.ClientTracker("../base/assets/tracker.wtc");

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

		var trackableStreit = new AR.Trackable2DObject(this.tracker, "marker8", {
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

		var trackableStreit_1 = new AR.Trackable2DObject(this.tracker, "marker8_1", {
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
	}
};

World.init();

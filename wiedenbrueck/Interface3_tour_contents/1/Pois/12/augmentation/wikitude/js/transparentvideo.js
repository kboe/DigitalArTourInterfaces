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
					//alert(name);
				},
				onExitFieldOfVision : function () {
					document.location = "architectsdk://exit";
					//document.location = "architectsdk://modelexittarget_"+name;
				}
			});

		var video = new AR.VideoDrawable("assets/rathaus.mp4", 0.94, {
				offsetY : -0.95,
				isTransparent : true,
				onPlaybackStarted : function () {
					document.location = "architectsdk://contentStarted_video";
				},
				onFinishedPlaying : function () {
					document.location = "architectsdk://contentStopped_video";
				}
			});

		video.play(1);
		video.pause();
		document.location = "architectsdk://contentStopped_video";

		var pageOne = new AR.Trackable2DObject(this.tracker, "marker12", {
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

		var pageOne_1 = new AR.Trackable2DObject(this.tracker, "marker12_1", {
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
	}
};

World.init();

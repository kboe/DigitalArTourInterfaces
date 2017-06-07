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

		var videoAnker = new AR.VideoDrawable("assets/ankervilla.mp4", 0.9, {
				offsetX : -0.3,
				offsetY : -0.9,
				isTransparent : true,
				onPlaybackStarted : function () {
					document.location = "architectsdk://contentStarted_video";
				},
				onFinishedPlaying : function () {
					document.location = "architectsdk://contentStopped_video";
				}
			});

		videoAnker.play(1);
		videoAnker.pause();
		document.location = "architectsdk://contentStopped_video";

		var trackableAnker = new AR.Trackable2DObject(this.tracker, "marker11", {
				drawables : {
					cam : [videoAnker]
				},
				onEnterFieldOfVision : function onEnterFieldOfVisionFn() {
					videoAnker.resume();
					document.location = "architectsdk://contentStarted_video";
				},
				onExitFieldOfVision : function onExitFieldOfVisionFn() {
					videoAnker.pause();
					document.location = "architectsdk://contentStopped_video";
				}
			});

		var trackableAnker_1 = new AR.Trackable2DObject(this.tracker, "marker11_1", {
				drawables : {
					cam : [videoAnker]
				},
				onEnterFieldOfVision : function onEnterFieldOfVisionFn() {
					videoAnker.resume();
				},
				onExitFieldOfVision : function onExitFieldOfVisionFn() {
					videoAnker.pause();
				}
			});
	}
};

World.init();

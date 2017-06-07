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

		var videoChrono = new AR.VideoDrawable("assets/Chronogramm.mp4", 1.01, {
				offsetX: -0.006,
				offsetY: -0.035,
				isTransparent : true,
				onPlaybackStarted : function () {
					document.location = "architectsdk://contentStarted_video";
				},
				onFinishedPlaying : function () {
					document.location = "architectsdk://contentStopped_video";
				}
			});

		videoChrono.play(1);
		videoChrono.pause();
		document.location = "architectsdk://contentStopped_video";

		var trackableVideo = new AR.Trackable2DObject(this.tracker, "marker6", {
				drawables : {
					cam : [videoChrono]
				},
				onEnterFieldOfVision : function onEnterFieldOfVisionFn() {
					videoChrono.resume();
					document.location = "architectsdk://contentStarted_video";
				},
				onExitFieldOfVision : function onExitFieldOfVisionFn() {
					videoChrono.pause();
					document.location = "architectsdk://contentStopped_video";

				}
			});

		var trackableVideo_1 = new AR.Trackable2DObject(this.tracker, "marker6_1", {
				drawables : {
					cam : [videoChrono]
				},
				onEnterFieldOfVision : function onEnterFieldOfVisionFn() {
					videoChrono.resume();
					document.location = "architectsdk://contentStarted_video";
				},
				onExitFieldOfVision : function onExitFieldOfVisionFn() {
					videoChrono.pause();
					document.location = "architectsdk://contentStopped_video";
				}
			});

		var trackableVideo_2 = new AR.Trackable2DObject(this.tracker, "marker6_2", {
				drawables : {
					cam : [videoChrono]
				},
				onEnterFieldOfVision : function onEnterFieldOfVisionFn() {
					videoChrono.resume();
					document.location = "architectsdk://contentStarted_video";
				},
				onExitFieldOfVision : function onExitFieldOfVisionFn() {
					videoChrono.pause();
					document.location = "architectsdk://contentStopped_video";
				}
			});
	}
};

World.init();

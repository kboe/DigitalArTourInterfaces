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

		var imgJudith = new AR.ImageResource("assets/judith.png");
		this.judith = new AR.ImageDrawable(imgJudith, 0.26, {
				offsetX : 0.23,
				offsetY : -0.15,
			});

		this.judithAnimation1 = new AR.PropertyAnimation(this.judith, "scale", 0.28, 2.5, 3500, {
				type : AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUAD
			}, {
				onFinish : function () {
					World.judithAnimation2.start()
				}
			});
		this.judithAnimation2 = new AR.PropertyAnimation(this.judith, "scale", 2.5, 0.28, 3500, {
				type : AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUAD
			}, {
				onFinish : function () {
					World.judithAnimation1.start()
				}
			});

		var trackableJudith = new AR.Trackable2DObject(this.tracker, "marker4", {
				drawables : {
					cam : [this.judith]
				},
				onEnterFieldOfVision : function () {
					World.judithAnimation1.start()
					document.location = "architectsdk://contentStarted_animation";
				},
				onExitFieldOfVision : function () {
					document.location = "architectsdk://contentStopped_animation";
				}
			});

		var trackableJudith_1 = new AR.Trackable2DObject(this.tracker, "marker4_1", {
				drawables : {
					cam : [this.judith]
				},
				onEnterFieldOfVision : function () {
					World.judithAnimation1.start()
					document.location = "architectsdk://contentStarted_animation";
				},
				onExitFieldOfVision : function () {
					document.location = "architectsdk://contentStopped_animation";
				}
			});
	}

};

World.init();

var World = {

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {

		this.tracker = new AR.ClientTracker("assets/tracker.wtc");

		var trackableBasis = new AR.Trackable2DObject(this.tracker, "*", {
				onEnterFieldOfVision: function (name) {
					//document.location = "architectsdk://modelontarget_"+name;
					document.location = "architectsdk://" + name;
				},
				onExitFieldOfVision: function () {
					document.location = "architectsdk://exit";
					//document.location = "architectsdk://modelexittarget_"+name;
				}
			});

		this.videoKlingel = new AR.VideoDrawable("assets/klingel.mp4", 0, {
				onFinishedPlaying: function () {
					document.location = "architectsdk://contentStopped_video";
				}
			});
		this.videoKlingel.play(1);
		this.videoKlingel.pause();

		this.modelFahrrad = new AR.Model("assets/fahrrad.wt3", {
				scale: {
					x: 0.1,
					y: 0.1,
					z: 0.1
				},
				translate: {
					x: -5,
					y: -2,
					z: 0.0
				},
				rotate: {
					roll: 0,
					tilt: -90,
					head: 0
				}
			});

		this.animFahrrad = new AR.ModelAnimation(World.modelFahrrad, "Fahrrad_animation");

		this.movingAnimation = new AR.PropertyAnimation(this.modelFahrrad, "translate.x", -5, 10, 15000, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.animFahrrad.stop();
					document.location = "architectsdk://contentStopped_animation";
				}
			});

		//TRACKABLES FOR 3D

		this.trackableFahrrad = new AR.Trackable2DObject(this.tracker, "marker9", {
				drawables: {
					cam: [this.modelFahrrad]
				},
				onEnterFieldOfVision: this.appearFahrrad,
				onExitFieldOfVision: function () {
					document.location = "architectsdk://contentStopped_animation";
				}
			});

		this.trackableFahrrad_1 = new AR.Trackable2DObject(this.tracker, "marker9_1", {
				drawables: {
					cam: [this.modelFahrrad]
				},
				onEnterFieldOfVision: this.appearFahrrad,
				onExitFieldOfVision: function () {
					document.location = "architectsdk://contentStopped_animation";
				}
			});
		this.trackableFahrrad_2 = new AR.Trackable2DObject(this.tracker, "marker9_2", {
				drawables: {
					cam: [this.modelFahrrad]
				},
				onEnterFieldOfVision: this.appearFahrrad,
				onExitFieldOfVision: function () {
					document.location = "architectsdk://contentStopped_animation";
				}
			});

		//TRACKABLES FOR SOUND

		this.trackableSound = new AR.Trackable2DObject(this.tracker, "marker9", {
				drawables: {
					cam: [this.videoKlingel]
				},
				onEnterFieldOfVision: function () {
					World.videoKlingel.resume();
					document.location = "architectsdk://contentStarted_video";
				}
			});

		this.trackableSound_1 = new AR.Trackable2DObject(this.tracker, "marker9_1", {
				drawables: {
					cam: [this.videoKlingel]
				},
				onEnterFieldOfVision: function () {
					World.videoKlingel.resume();
					document.location = "architectsdk://contentStarted_video";
				}
			});
		this.trackableSound_2 = new AR.Trackable2DObject(this.tracker, "marker9_2", {
				drawables: {
					cam: [this.videoKlingel]
				},
				onEnterFieldOfVision: function () {
					World.videoKlingel.resume();
					document.location = "architectsdk://contentStarted_video";
				}
			});

		var videoInfotext = new AR.VideoDrawable("assets/Dialog_wiki.mp4", 0.94, {
			offsetX : 0,
			offsetY : 0,
			isTransparent: true
		});

		videoInfotext.play(-1);
		videoInfotext.pause();

		this.trackableInfotext = new AR.Trackable2DObject(this.tracker, "marker9", {
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
			World.trackableInfotext.enabled = true;
			World.trackableFahrrad.enabled = false;
			World.trackableFahrrad_1.enabled = false;
			World.trackableFahrrad_2.enabled = false;
			World.trackableSound.enabled = false;
			World.trackableSound_1.enabled = false;
			World.trackableSound_2.enabled = false;
	},

	switchContentToAR: function switchContentToARFn(){
			World.trackableInfotext.enabled = false;
			World.trackableFahrrad.enabled = true;
			World.trackableFahrrad_1.enabled = true;
			World.trackableFahrrad_2.enabled = true;
			World.trackableSound.enabled = true;
			World.trackableSound_1.enabled = true;
			World.trackableSound_2.enabled = true;
	},

	appearFahrrad: function appearFahrradFn() {
		World.animFahrrad.start(-1);
		World.movingAnimation.start();
		document.location = "architectsdk://contentStarted_animation";
	},
	turnEverythingOff: function turnEverythingOffFn(){
			World.trackableInfotext.enabled = false;
			World.trackableFahrrad.enabled = false;
			World.trackableFahrrad_1.enabled = false;
			World.trackableFahrrad_2.enabled = false;
			World.trackableSound.enabled = false;
			World.trackableSound_1.enabled = false;
			World.trackableSound_2.enabled = false;
    }
};

World.init();

var World = {
	scaleKarten: 0.29,
	sortedPositions: [[-0.4, 0.7, 0], [0, 0.7, 0], [0.4, 0.7, 0], [-0.4, 0.35, 0], [0, 0.35, 0], [0.4, 0.35, 0], [-0.4, 0, 0], [0, 0, 0], [0.4, 0, 0], [-0.4, -0.35, 0], [0, -0.35, 0], [0.4, -0.35, 0]],
	positions: [[-0.4, 0.7, 0], [0, 0.7, 0], [0.4, 0.7, 0], [-0.4, 0.35, 0], [0, 0.35, 0], [0.4, 0.35, 0], [-0.4, 0, 0], [0, 0, 0], [0.4, 0, 0], [-0.4, -0.35, 0], [0, -0.35, 0], [0.4, -0.35, 0]],
	counter: [],
	init: function initFn() {
		for (var i = 0; i < 12; i++) {
			do {
				var j = Math.random() * 12;
				j = Math.trunc(j);
			} while (this.counter.indexOf(j) != -1)
			this.counter.push(j);
		}
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {

		this.tracker = new AR.ClientTracker("../base/assets/tracker.wtc");

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

		var aufgabeWidget = new AR.HtmlDrawable({
				uri: "assets/aufgabe.html"
			}, 1.2, {
				viewportWidth: 500,
				viewportHeight: 77,
				backgroundColor: "#F4B005",
				offsetX: 0,
				offsetY: 1.12,
				horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.MIDDLE,
				verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
				clickThroughEnabled: false,
				allowDocumentLocationChanges: false,
				opacity: 0.9
			});

		var gewonnenWidget = new AR.HtmlDrawable({
				uri: "assets/gewonnen.html"
			}, 1.2, {
				viewportWidth: 500,
				viewportHeight: 77,
				backgroundColor: "#F4B005",
				offsetX: 0,
				offsetY: 1.12,
				horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.MIDDLE,
				verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
				clickThroughEnabled: false,
				allowDocumentLocationChanges: false,
				opacity: 0
			});

		this.modelKarte1 = new AR.Model("assets/karte08.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[0]][0],
					y: this.positions[this.counter[0]][1],
					z: this.positions[this.counter[0]][2]
				},
				onClick: function () {
					World.modelKarte1.onClick = null;
					World.modelKarte2.onClick = null;
					World.modelKarte3.onClick = null;
					World.modelKarte4.onClick = null;
					World.modelKarte5.onClick = null;
					World.modelKarte6.onClick = null;
					World.modelKarte7.onClick = null;
					World.modelKarte8.onClick = null;
					World.modelKarte9.onClick = null;
					World.modelKarte10.onClick = null;
					World.modelKarte11.onClick = null;
					World.modelKarte12.onClick = null;
					World.rotationAnimation1.start(1);

				}
			});
		this.modelKarte2 = new AR.Model("assets/karte09.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[1]][0],
					y: this.positions[this.counter[1]][1],
					z: this.positions[this.counter[1]][2]
				},
				onClick: function () {
					World.rotationAnimation2.start(1);
					World.modelKarte2.onClick = null;
				}
			});
		this.modelKarte3 = new AR.Model("assets/karte10.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[2]][0],
					y: this.positions[this.counter[2]][1],
					z: this.positions[this.counter[2]][2]
				},
				onClick: function () {
					World.rotationAnimation3.start(1);
					World.modelKarte3.onClick = null;
				}
			});
		this.modelKarte4 = new AR.Model("assets/karte11.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[3]][0],
					y: this.positions[this.counter[3]][1],
					z: this.positions[this.counter[3]][2]
				},
				onClick: function () {
					World.rotationAnimation4.start(1);
					World.modelKarte4.onClick = null;
				}
			});
		this.modelKarte5 = new AR.Model("assets/karte12.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[4]][0],
					y: this.positions[this.counter[4]][1],
					z: this.positions[this.counter[4]][2]
				},
				onClick: function () {
					World.rotationAnimation5.start(1);
					World.modelKarte5.onClick = null;
				}
			});
		this.modelKarte6 = new AR.Model("assets/karte01.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[5]][0],
					y: this.positions[this.counter[5]][1],
					z: this.positions[this.counter[5]][2]
				},
				onClick: function () {
					World.rotationAnimation6.start(1);
					World.modelKarte6.onClick = null;
				}
			});
		this.modelKarte7 = new AR.Model("assets/karte02.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[6]][0],
					y: this.positions[this.counter[6]][1],
					z: this.positions[this.counter[6]][2]
				},
				onClick: function () {
					World.rotationAnimation7.start(1);
					World.modelKarte7.onClick = null;
				}
			});
		this.modelKarte8 = new AR.Model("assets/karte03.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[7]][0],
					y: this.positions[this.counter[7]][1],
					z: this.positions[this.counter[7]][2]
				},
				onClick: function () {
					World.rotationAnimation8.start(1);
					World.modelKarte8.onClick = null;
				}
			});
		this.modelKarte9 = new AR.Model("assets/karte04.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[8]][0],
					y: this.positions[this.counter[8]][1],
					z: this.positions[this.counter[8]][2]
				},
				onClick: function () {
					World.rotationAnimation9.start(1);
					World.modelKarte9.onClick = null;
				}
			});
		this.modelKarte10 = new AR.Model("assets/karte05.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[9]][0],
					y: this.positions[this.counter[9]][1],
					z: this.positions[this.counter[9]][2]
				},
				onClick: function () {
					World.rotationAnimation10.start(1);
					World.modelKarte10.onClick = null;
				}
			});
		this.modelKarte11 = new AR.Model("assets/karte06.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[10]][0],
					y: this.positions[this.counter[10]][1],
					z: this.positions[this.counter[10]][2]
				},
				onClick: function () {
					World.rotationAnimation11.start(1);
					World.modelKarte11.onClick = null;
				}
			});
		this.modelKarte12 = new AR.Model("assets/karte07.wt3", {
				scale: {
					x: this.scaleKarten,
					y: this.scaleKarten,
					z: this.scaleKarten
				},
				translate: {
					x: this.positions[this.counter[11]][0],
					y: this.positions[this.counter[11]][1],
					z: this.positions[this.counter[11]][2]
				},
				onClick: function () {
					World.rotationAnimation12.start(1);
					World.modelKarte12.onClick = null;
				}

			});

		this.rotationAnimation1 = new AR.PropertyAnimation(this.modelKarte1, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.winningAnimation.start(1);
					setTimeout(function () {
						gewonnenWidget.opacity = 0.9;
						aufgabeWidget.opacity = 0;
					}, 1500);
				}
			});

		this.rotationAnimation2 = new AR.PropertyAnimation(this.modelKarte2, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					setTimeout(function () {
						World.rotation2Animation2.start(1);
					}, 1500);
				}
			});
		this.rotationAnimation3 = new AR.PropertyAnimation(this.modelKarte3, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					setTimeout(function () {
						World.rotation2Animation3.start(1);
					}, 1500);
				}
			});
		this.rotationAnimation4 = new AR.PropertyAnimation(this.modelKarte4, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					setTimeout(function () {
						World.rotation2Animation4.start(1);
					}, 1500);
				}
			});
		this.rotationAnimation5 = new AR.PropertyAnimation(this.modelKarte5, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					setTimeout(function () {
						World.rotation2Animation5.start(1);
					}, 1500);
				}
			});
		this.rotationAnimation6 = new AR.PropertyAnimation(this.modelKarte6, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					setTimeout(function () {
						World.rotation2Animation6.start(1);
					}, 1500);
				}
			});
		this.rotationAnimation7 = new AR.PropertyAnimation(this.modelKarte7, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					setTimeout(function () {
						World.rotation2Animation7.start(1);
					}, 1500);
				}
			});
		this.rotationAnimation8 = new AR.PropertyAnimation(this.modelKarte8, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					setTimeout(function () {
						World.rotation2Animation8.start(1);
					}, 1500);
				}
			});
		this.rotationAnimation9 = new AR.PropertyAnimation(this.modelKarte9, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					setTimeout(function () {
						World.rotation2Animation9.start(1);
					}, 1500);
				}
			});
		this.rotationAnimation10 = new AR.PropertyAnimation(this.modelKarte10, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					setTimeout(function () {
						World.rotation2Animation10.start(1);
					}, 1500);
				}
			});
		this.rotationAnimation11 = new AR.PropertyAnimation(this.modelKarte11, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					setTimeout(function () {
						World.rotation2Animation11.start(1);
					}, 1500);
				}
			});
		this.rotationAnimation12 = new AR.PropertyAnimation(this.modelKarte12, "rotate.heading", 0, 180, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					setTimeout(function () {
						World.rotation2Animation12.start(1);
					}, 1500);
				}
			});

		this.rotation2Animation2 = new AR.PropertyAnimation(this.modelKarte2, "rotate.heading", 180, 0, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.modelKarte2.onClick = function () {
						World.rotationAnimation2.start(1);
						World.modelKarte2.onClick = null;
					}
				}
			});
		this.rotation2Animation3 = new AR.PropertyAnimation(this.modelKarte3, "rotate.heading", 180, 0, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.modelKarte3.onClick = function () {
						World.rotationAnimation3.start(1);
						World.modelKarte3.onClick = null;
					}
				}
			});
		this.rotation2Animation4 = new AR.PropertyAnimation(this.modelKarte4, "rotate.heading", 180, 0, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.modelKarte4.onClick = function () {
						World.rotationAnimation4.start(1);
						World.modelKarte4.onClick = null;
					}
				}
			});
		this.rotation2Animation5 = new AR.PropertyAnimation(this.modelKarte5, "rotate.heading", 180, 0, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.modelKarte5.onClick = function () {
						World.rotationAnimation5.start(1);
						World.modelKarte5.onClick = null;
					}
				}
			});
		this.rotation2Animation6 = new AR.PropertyAnimation(this.modelKarte6, "rotate.heading", 180, 0, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.modelKarte6.onClick = function () {
						World.rotationAnimation6.start(1);
						World.modelKarte6.onClick = null;
					}
				}
			});
		this.rotation2Animation7 = new AR.PropertyAnimation(this.modelKarte7, "rotate.heading", 180, 0, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.modelKarte7.onClick = function () {
						World.rotationAnimation7.start(1);
						World.modelKarte7.onClick = null;
					}
				}
			});
		this.rotation2Animation8 = new AR.PropertyAnimation(this.modelKarte8, "rotate.heading", 180, 0, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.modelKarte8.onClick = function () {
						World.rotationAnimation8.start(1);
						World.modelKarte8.onClick = null;
					}
				}
			});
		this.rotation2Animation9 = new AR.PropertyAnimation(this.modelKarte9, "rotate.heading", 180, 0, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.modelKarte9.onClick = function () {
						World.rotationAnimation9.start(1);
						World.modelKarte9.onClick = null;
					}
				}
			});
		this.rotation2Animation10 = new AR.PropertyAnimation(this.modelKarte10, "rotate.heading", 180, 0, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.modelKarte10.onClick = function () {
						World.rotationAnimation10.start(1);
						World.modelKarte10.onClick = null;
					}
				}
			});
		this.rotation2Animation11 = new AR.PropertyAnimation(this.modelKarte11, "rotate.heading", 180, 0, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.modelKarte11.onClick = function () {
						World.rotationAnimation11.start(1);
						World.modelKarte11.onClick = null;
					}
				}
			});
		this.rotation2Animation12 = new AR.PropertyAnimation(this.modelKarte12, "rotate.heading", 180, 0, 500, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					World.modelKarte12.onClick = function () {
						World.rotationAnimation12.start(1);
						World.modelKarte12.onClick = null;
					}
				}
			});

		this.winningAnimation = this.createWinningAnimation(this.modelKarte1, 1.6);

		var trackable = new AR.Trackable2DObject(this.tracker, "marker16", {
				drawables: {
					cam: [this.modelKarte1, this.modelKarte2, this.modelKarte3, this.modelKarte4, this.modelKarte5, this.modelKarte6, this.modelKarte7, this.modelKarte8, this.modelKarte9, this.modelKarte10, this.modelKarte11, this.modelKarte12, aufgabeWidget, gewonnenWidget]
				}
			});

		var trackable_1 = new AR.Trackable2DObject(this.tracker, "marker16_1", {
				drawables: {
					cam: [this.modelKarte1, this.modelKarte2, this.modelKarte3, this.modelKarte4, this.modelKarte5, this.modelKarte6, this.modelKarte7, this.modelKarte8, this.modelKarte9, this.modelKarte10, this.modelKarte11, this.modelKarte12, aufgabeWidget, gewonnenWidget]
				}
			});
	},

	createWinningAnimation: function createWinningAnimationFn(model, scale) {
		var sx = new AR.PropertyAnimation(model, "scale.x", World.scaleKarten, scale, 2000);
		var sy = new AR.PropertyAnimation(model, "scale.y", World.scaleKarten, scale, 2000);
		var sz = new AR.PropertyAnimation(model, "scale.z", World.scaleKarten, scale, 2000);

		var tx = new AR.PropertyAnimation(model, "translate.x", model.translate.x, 0, 2000, {
				type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUAD
			});
		var ty = new AR.PropertyAnimation(model, "translate.y", model.translate.y, 0, 2000, {
				type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUAD
			});
		var tz = new AR.PropertyAnimation(model, "translate.z", model.translate.z, 0.1, 2000, {
				type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUAD
			});

		return new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL, [sx, sy, sz, tx, ty, tz]);
	}
};

World.init();

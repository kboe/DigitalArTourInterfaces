var World = {

	init : function initFn() {
		this.createOverlays();
	},

	createOverlays : function createOverlaysFn() {

		this.tracker = new AR.ClientTracker("assets/tracker.wtc");
		var trackableBasis = new AR.Trackable2DObject(this.tracker, "*", {
				onEnterFieldOfVision : function (name) {
					//document.location = "architectsdk://modelontarget_"+name;
					//document.location = "architectsdk://modelOnTarget_" + name;
					//AR.platformsendJsonObject("{markerId: "+name"}");
					//var s=JSON.stringify("{markerId: "+name+"}");
					var s="{\"markerId\":"+JSON.stringify(name)+"}";
					AR.platform.sendJSONObject(JSON.parse(s));
				},
				onExitFieldOfVision : function () {
					//document.location = "architectsdk://exit";
					//document.location = "architectsdk://modelexittarget_"+name;
				}
			});
	}
};

World.init();

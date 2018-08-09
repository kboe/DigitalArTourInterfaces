var allDrawables = [];
var allVisibleDrawables = [];
var editable = false;
var targetCollectionResource = new AR.TargetCollectionResource("../../../../baseAugmentation/wikitude/assets/tracker.wtc");
var tracker = new AR.ImageTracker(targetCollectionResource);
var trackableBasis = new AR.ImageTrackable(tracker, "*", {
    onImageRecognized: function (name) {
        document.location = "architectsdk://modelontarget_" + name;
        for (var i = 0; i < allDrawables.length; i++) {
            if (allDrawables[i].trackable.targetName == name || allDrawables[i].trackable.targetName == "*") {
                allDrawables[i].onImageRecognized(name);
            }
        }
    },
    onImageLost: function (name) {
        document.location = "architectsdk://modelexittarget_" + name;
        for (var i = 0; i < allDrawables.length; i++) {
            if (allDrawables[i].trackable.targetName == name || allDrawables[i].trackable.targetName == "*") {
                allDrawables[i].onImageLost(name);
            }
        }
    }
});


class RTTrackable extends AR.Trackable2DObject {
    constructor(name){
        super(tracker, name, {
            onImageRecognized: function (name) {
            },
            onImageLost: function (name) {
            }
        });
    }
}

function createRotationAnimation(drawable){

			var rotationAnimation = new AR.PropertyAnimation(drawable, "rotate.y", 0, 180, 600, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
		});
		var liftingAnimation1 = new AR.PropertyAnimation(drawable, "translate.z", 0, 0.3, 300, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					var liftingAnimation2 = new AR.PropertyAnimation(drawable, "translate.z", 0.3, drawable.positionZ, 300, {
							type: AR.CONST.EASING_CURVE_TYPE.LINEAR
						});
					liftingAnimation2.start();
				}
		});

		return new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL, [rotationAnimation, liftingAnimation1]);

}

function createRotation2Animation(drawable){

			var rotationAnimation = new AR.PropertyAnimation(drawable, "rotate.y", 180, 360, 600, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
		});
		var liftingAnimation1 = new AR.PropertyAnimation(drawable, "translate.z", 0, 0.3, 300, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			}, {
				onFinish: function () {
					var liftingAnimation2 = new AR.PropertyAnimation(drawable, "translate.z", 0.3, drawable.positionZ, 300, {
							type: AR.CONST.EASING_CURVE_TYPE.LINEAR
						});
					liftingAnimation2.start();
				}
		});

		var animGroup = new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL, [rotationAnimation, liftingAnimation1]);
		animGroup.drawable = drawable;
		animGroup.onFinish = function(){

			enableClick(this.drawable);

		}
		return animGroup;
}

function createWinningAnimation(card1, card2){

			var winningAnimation1x = new AR.PropertyAnimation(card1, "translate.x", card1.translate.x, -0.45, 800, {
									type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			});
			var winningAnimation1y = new AR.PropertyAnimation(card1, "translate.y", card1.translate.y, 0, 800, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			});
			var winningAnimation1z = new AR.PropertyAnimation(card1, "translate.z", card1.translate.z, 0.1, 400, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			});

			var winningAnimation2x = new AR.PropertyAnimation(card2, "translate.x", card2.translate.x, -0.45, 800, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			});
			var winningAnimation2y = new AR.PropertyAnimation(card2, "translate.y", card2.translate.y, 0, 800, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			});
			var winningAnimation2z = new AR.PropertyAnimation(card2, "translate.z", card2.translate.z, 0.2, 400, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			});
			return new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL, [winningAnimation1x, winningAnimation1y,winningAnimation1z,winningAnimation2x,winningAnimation2y,winningAnimation2z]);

}


function disableClick(drawable){

	drawable.oldOnClickAnimations = drawable.onClickAnimations;
	drawable.onClickAnimations = [];
	drawable.disabledClick = true;

}

function enableClick(drawable){

	drawable.onClickAnimations = drawable.oldOnClickAnimations;
	drawable.disabledClick = false;

}


class RTMemory{

	constructor(pairs, positionX, positionY){
		this.turnedCard = null;
		this.pairs = [];
		this.successCount = 0;
		this.positions = [
		[0.19, -0.25, 0],
		[-0.26, 0.2, 0],
		[-0.30, 0.02, 0],
		[-0.12, 0.08, 0],
		[-0.11, -0.07, 0],
		[-0.11, -0.21, 0],
		[0.04, -0.18, 0],
		[0.05, -0.36, 0],
		[0.03, 0.15, 0],
		[0.17, 0.13, 0],
		[-0.313, -0.26, 0],
		[0.184, -0.02, 0],
		[0.324, -0.1, 0],
		[0.319, 0.05, 0]];

		for(var j = 0; j<this.positions.length;j++){

			this.positions[j][0]=this.positions[j][0]*1.5;
			this.positions[j][1]=this.positions[j][1]*1.5;

		}

		this.allCards = [];
        this.initialCenterX = positionX;
        this.initialCenterY = positionY;

		for(var i = 0; i<pairs.length; i++){
			this.pairs.push(pairs[i]);
			this.allCards.push(this.pairs[i].card1);
			this.allCards.push(this.pairs[i].card2);

			var card = this.pairs[i].card1;
			var j = Math.random() * 100;
				j = Math.trunc(j);
			card.translate.x = 0.0005*j-0.003+this.initialCenterX;
			var j = Math.random() * 100;
				j = Math.trunc(j);
			card.translate.y = 0.0005*j-0.003+this.initialCenterY;
			var j = Math.random() * 100;
				j = Math.trunc(j);
			card.translate.z = 0.01*i;
			card.positionZ = card.translate.z;

			var j = Math.random() * 45;
				j = Math.trunc(j);
			card.rotate.z = j-22.5;
			card.disabledClick = false;
			card.rotate.x = 0;
			card.rotate.y = 0;

			var card = this.pairs[i].card2;
			var j = Math.random() * 100;
				j = Math.trunc(j);
			card.translate.x = 0.0005*j-0.003+this.initialCenterX;
			var j = Math.random() * 100;
				j = Math.trunc(j);
			card.translate.y = 0.0005*j-0.003+this.initialCenterY;
			var j = Math.random() * 100;
				j = Math.trunc(j);
			card.translate.z = 0.01*i+0.005;

			var j = Math.random() * 45;
				j = Math.trunc(j);
			card.rotate.z = j-22.5;
			card.positionZ = card.translate.z;
			card.disabledClick = false;
			card.rotate.x = 0;
			card.rotate.y = 0;

			this.pairs[i].card1.memoryGame = this;
			this.pairs[i].card2.memoryGame = this;

			this.pairs[i].card1.turnBackAnim = createRotation2Animation(this.pairs[i].card1,false);
			this.pairs[i].card2.turnBackAnim = createRotation2Animation(this.pairs[i].card2,false);

			this.pairs[i].card1.onClickAnimations.push(new RTAnimation(createRotationAnimation(this.pairs[i].card1,false)));
			this.pairs[i].card2.onClickAnimations.push(new RTAnimation(createRotationAnimation(this.pairs[i].card2,false)));
			this.pairs[i].card1.onClickAdditions = function(){
				if(!this.disabledClick){
					disableClick(this);
					if(this.memoryGame.turnedCard==null){
						this.memoryGame.turnedCard = this;
					}else{
						if(this.memoryGame.turnedCard == this.partnerCard){
							successAnimation(this,this.partnerCard);
						}else{
							turnBackFunction(this,this.memoryGame.turnedCard);

						}
						this.memoryGame.turnedCard = null;
					}
				}
			}
			this.pairs[i].card2.onClickAdditions = function(){
				if(!this.disabledClick){
					disableClick(this);
					if(this.memoryGame.turnedCard==null){
						this.memoryGame.turnedCard = this;
					}else{
						if(this.memoryGame.turnedCard == this.partnerCard){
							successAnimation(this,this.partnerCard);
						}else{
							turnBackFunction(this,this.memoryGame.turnedCard);
						}
						this.memoryGame.turnedCard = null;
					}
				}
			}
		}

	}

	turnAnimation(drawable){

		liftingAnimation1.start();
		rotationAnimation.start();
	}

	turnBackAnimation(drawable){
		this.turnAnimation(drawable);
	}

	shuffleCards(){
		this.counter = [];
		for (var i = 0; i < 14; i++) {
			do {
				var j = Math.random() * 14;
				j = Math.trunc(j);
			} while (this.counter.indexOf(j) != -1)
			this.counter.push(j);
		}
		for(var i = 0; i<this.allCards.length;i++){
			var card = this.allCards[i];
			card.positionX = this.positions[this.counter[i]][0];
			card.positionY = this.positions[this.counter[i]][1];
			card.positionZ = card.translate.z;
			var anim = createMoveToPositionAnim(this.allCards[i],1000,card.positionX,card.positionY,0);
			anim.card = card;
			anim.onFinish = function(){
				this.card.translate.x = this.card.positionX;
				this.card.translate.y = this.card.positionY;
				this.card.translate.z = 0;
			}
			anim.start();
		}
	}

	collectCards(){
		for(var i = 0; i<this.allCards.length;i++){
			var card = this.allCards[i];
			moveBackAnim(card,1000,0,0,0);
		}
	}

	setInitialTranslatesForAllCards(){
		for(var i = 0; i<this.allCards.length;i++){
			var card = this.allCards[i];
				card.translate.x = this.positions[i][0];
				card.translate.y = this.positions[i][1];
				card.translate.z = this.positions[i][2];
		}
	}

	winning(){
	}

}

function moveBackAnim(drawable, time, x,y,z){
	var anim = createMoveToPositionAnim(drawable,1000,0,0,drawable.positionZ);
	anim.card = drawable;
	anim.onFinish = function(){
		this.card.translate.x = 0;
		this.card.translate.y = 0;
	}
	anim.start();


}


function successAnimation(card1, card2){
		//alert("success: "+card1.name +" + "+card2.name);
		card1.memoryGame.successCount++;
		var anim = createWinningAnimation(card1,card2);
		anim.onFinish = function () {
			setTimeout(function () {
				card1.removeFromCam();
				card2.removeFromCam();
			}, 1500);
		};
		setTimeout(function () {
			anim.start();
		}, 500);


		if(card1.memoryGame.successCount == card1.memoryGame.pairs.length){
				setTimeout(function () {
					card1.memoryGame.winning();
				}, 2500);
		}

}

function turnBackFunction(drawable1, drawable2){
	setTimeout(function () {
		drawable1.turnBackAnim.start();
		drawable2.turnBackAnim.start();
	}, 1500);

}

class RTMemoryPair{

	constructor(drawable1, drawable2){
		this.card1 = drawable1;
		this.card2 = drawable2;
		this.turned1 = false;
		this.turned2 = false;
		this.finished = false;
		this.card1.partnerCard = this.card2;
		this.card2.partnerCard = this.card1;
	}



}

class RTMenuGroup {
    constructor(scale, innerPaddingV, horizontal, anchorX, anchorY) {
        this.menuElements = [];
        this.innerPadding = innerPaddingV;
        this.anchorX = anchorX;
        this.anchorY = anchorY;
        this.horizontal = horizontal;
        this.scale = scale;
    }

    addMenuElement(drawable){
        if (this.horizontal) {
            if (this.menuElements.length > 0) {
                drawable.translate.x = this.menuElements[this.menuElements.length-1].translate.x + this.innerPadding;
                drawable.translate.y = this.menuElements[0].translate.y;

                drawable.scale.x = this.menuElements[0].scale.x;
                drawable.scale.y = this.menuElements[0].scale.y;

                drawable.previousDragValueX = drawable.translate.x;
                drawable.previousDragValueY = drawable.translate.y;

                this.menuElements.push(drawable);
            } else {
                drawable.translate.x = this.anchorX;
                drawable.translate.y = this.anchorY;

                drawable.scale.x = this.scale;
                drawable.scale.y = this.scale;

                drawable.previousDragValueX = drawable.translate.x;
                drawable.previousDragValueY = drawable.translate.y;

                this.menuElements.push(drawable);
            }
        } else {
            if (this.menuElements.length > 0) {
                drawable.translate.y = this.menuElements[this.menuElements.length-1].translate.y - this.innerPadding;
                drawable.translate.x = this.menuElements[0].translate.x;

                drawable.scale.x = this.menuElements[0].scale.x;
                drawable.scale.y = this.menuElements[0].scale.y;

                drawable.previousDragValueY = drawable.translate.y;
                drawable.previousDragValueX = drawable.translate.x;

                this.menuElements.push(drawable);
            } else {
                drawable.translate.x = this.anchorX;
                drawable.translate.y = this.anchorY;

                drawable.scale.x = this.scale;
                drawable.scale.y = this.scale;

                drawable.previousDragValueY = drawable.translate.y;
                drawable.previousDragValueX = drawable.translate.x;

                this.menuElements.push(drawable);
            }
        }

    }

}


class RTAnimation {
    constructor(animation, repeating) {
        this.animation = animation;
        this.repeating = repeating;
    }
}

class RTImage extends AR.ImageDrawable {

    constructor(path, scaleFactor, optionsJSON, trackablename) {
        var resource = new AR.ImageResource(path);
        var values = {
            translate: optionsJSON.translate,
            rotate: optionsJSON.rotate,
            scale: optionsJSON.scale,
            onDragBegan: function (x, y) {
                this.myOnDragBegan(x,y);
                return true;
            },
            onDragChanged: function (x, y) {
                this.myOnDragChanged(x,y);
                return true;
            },
            onDragEnded: function (x, y) {
                this.myOnDragEnded(x,y);
                return true;
            },
            onRotationBegan: function (angleInDegrees) {
                this.myOnRotationBegan(angleInDegrees);
                return true;
            },
            onRotationChanged: function (angleInDegrees) {
                this.myOnRotationChanged(angleInDegrees);
                return true;
            },
            onRotationEnded: function (angleInDegrees) {
                this.myOnRotationEnded(angleInDegrees);
                return true;
            },
            onScaleBegan: function (scale) {
                this.myOnScaleBegan(scale);
                return true;
            },
            onScaleChanged: function (scale) {
                this.myOnScaleChanged(scale);
                return true;
            },
            onScaleEnded: function (scale) {
                this.myOnScaleEnded(scale);
                return true;
            }
        };
        super(resource, scaleFactor, values);
        var dirs = path.split("/");
        var nameParts = dirs[dirs.length - 1].split(".png");
        this.name = nameParts[0];
        this.attachedDrawables = [];
        this.inverseDrawable = this;
        this.toggleTrue = true;
        this.onClickAnimations = [];
        this.onRecognitionAnimations = [];
        this.onAddToCamAnimations = [];
        this.onRemoveFromCamAnimations = [];
        allDrawables.push(this);
        this.playVideoOnClick = null;
        this.previousDragValueX = optionsJSON.translate.x;
        this.previousDragValueY = optionsJSON.translate.y;
        this.previousDragValueZ = optionsJSON.translate.z;
        this.previousRotationValueX = optionsJSON.rotate.x;
        this.previousRotationValueY = optionsJSON.rotate.y;
        this.previousRotationValueZ = optionsJSON.rotate.z;
        this.previousScaleValue = optionsJSON.scale.x;
        this.previousScaleValueX = optionsJSON.scale.x;
        this.previousScaleValueY = optionsJSON.scale.y;
        this.previousScaleValueZ = optionsJSON.scale.z;
        this.oneFingerGestureAllowed = false;
        this.positioningEnabled = true;
        this.scalingEnabled = true;
        this.rotatingEnabled = false;
        this.rotateAxisX = false;
        this.rotateAxisY = false;
        this.rotateAxisZ = true;
        this.positioningAxisX = true;
        this.positioningAxisY = true;
        this.positioningAxisZ = false;

        this.trackable = trackablename;
        this.onClick = function () {
            if (this.playVideoOnClick != null) {
                this.playVideoOnClick.play(0);
                this.removeFromCam();
            }
            this.onClickAdditions();
            this.onClickAnimation();
        }
    }

    onImageRecognized(targetName) {
        this.onRecognitionAnimation();
    }

    onImageLost(targetName) {
        this.onLostAnimation();
    }

    removeFromCam() {
        for (var i = 0; i < this.onRemoveFromCamAnimations.length; i++) {
            if (this.onRemoveFromCamAnimations[i].repeating) {
                this.onRemoveFromCamAnimations[i].animation.start(-1);
            } else {
                this.onRemoveFromCamAnimations[i].animation.start();
            }
        }
        allVisibleDrawables.splice(allVisibleDrawables.indexOf(this),1);
        this.trackable.drawables.removeCamDrawable(this);
    }

    addToCam() {
        allVisibleDrawables.push(this);
        this.trackable.drawables.addCamDrawable(this);
        for (var i = 0; i < this.onAddToCamAnimations.length; i++) {
            if (this.onAddToCamAnimations[i].repeating) {
                this.onAddToCamAnimations[i].animation.start(-1);
            } else {
                this.onAddToCamAnimations[i].animation.start();
            }
        }
    }

    onClickAdditions() {




    }

    onRecognitionAnimation() {
        for (var i = 0; i < this.onRecognitionAnimations.length; i++) {
            if (this.onRecognitionAnimations[i].repeating) {
                this.onRecognitionAnimations[i].animation.start(-1);
            } else {
                this.onRecognitionAnimations[i].animation.start();
            }
        }
    }

    onLostAnimation() {

    }

    onClickAnimation() {
        for (var i = 0; i < this.onClickAnimations.length; i++) {
            if (this.onClickAnimations[i].repeating) {
                this.onClickAnimations[i].animation.start(-1);
            } else {
                this.onClickAnimations[i].animation.start();
            }
        }
    }

    myOnDragBegan(x,y){
        return true;
    }
    myOnDragChanged(x,y){
        return true;
    }
    myOnDragEnded(x,y){
        return true;
    }
    myOnRotationBegan(angleInDegrees){
        return true;
    }
    myOnRotationChanged(angleInDegrees){
        return true;
    }
    myOnRotationEnded(angleInDegrees){
        return true;
    }
    myOnScaleBegan(scale){
        return true;
    }
    myOnScaleChanged(scale){
        return true;
    }
    myOnScaleEnded(scale){
        return true;
    }
}

class RTModel extends AR.Model {

    constructor(path, optionsJSON,trackablename) {
        var values = {
            translate: optionsJSON.translate,
            rotate: optionsJSON.rotate,
            scale: optionsJSON.scale,
            onDragBegan: function (x, y) {
                this.myOnDragBegan(x,y);
                return true;
            },
            onDragChanged: function (x, y) {
                this.myOnDragChanged(x,y);
                return true;
            },
            onDragEnded: function (x, y) {
                this.myOnDragEnded(x,y);
                return true;
            },
            onRotationBegan: function (angleInDegrees) {
                this.myOnRotationBegan(angleInDegrees);
                return true;
            },
            onRotationChanged: function (angleInDegrees) {
                this.myOnRotationChanged(angleInDegrees);
                return true;
            },
            onRotationEnded: function (angleInDegrees) {
                this.myOnRotationEnded(angleInDegrees);
                return true;
            },
            onScaleBegan: function (scale) {
                this.myOnScaleBegan(scale);
                return true;
            },
            onScaleChanged: function (scale) {
                this.myOnScaleChanged(scale);
                return true;
            },
            onScaleEnded: function (scale) {
                this.myOnScaleEnded(scale);
                return true;
            }
        };
        super(path, values);
        var dirs = path.split("/");
        var nameParts = dirs[dirs.length - 1].split(".wt3");
        this.name = nameParts[0];
        this.onClickAnimations = [];
        this.onRecognitionAnimations = [];
        this.onAddToCamAnimations = [];
        this.onRemoveFromCamAnimations = [];
        allDrawables.push(this);
        this.previousDragValueX = optionsJSON.translate.x;
        this.previousDragValueY = optionsJSON.translate.y;
        this.previousDragValueZ = optionsJSON.translate.z;
        this.previousRotationValueX = optionsJSON.rotate.x;
        this.previousRotationValueY = optionsJSON.rotate.y;
        this.previousRotationValueZ = optionsJSON.rotate.z;
        this.previousScaleValue = optionsJSON.scale.x;
        this.previousScaleValueX = optionsJSON.scale.x;
        this.previousScaleValueY = optionsJSON.scale.y;
        this.previousScaleValueZ = optionsJSON.scale.z;
        this.oneFingerGestureAllowed = false;
        this.positioningEnabled = true;
        this.scalingEnabled = true;
        this.rotatingEnabled = false;
        this.rotateAxisX = false;
        this.rotateAxisY = false;
        this.rotateAxisZ = true;
        this.positioningAxisX = true;
        this.positioningAxisY = true;
        this.positioningAxisZ = false;
        this.onClick = function () {
            this.onClickAnimation();
            this.onClickAdditions();
        }
        this.trackable = trackablename;
    }

    onImageRecognized(targetName) {
        this.onRecognitionAnimation();
    }

    onImageLost(targetName) {
        this.onLostAnimation();
    }


    removeFromCam() {
        for (var i = 0; i < this.onRemoveFromCamAnimations.length; i++) {
            if (this.onRemoveFromCamAnimations[i].repeating) {
                this.onRemoveFromCamAnimations[i].animation.start(-1);
            } else {
                this.onRemoveFromCamAnimations[i].animation.start();
            }
        }
        allVisibleDrawables.splice(allVisibleDrawables.indexOf(this),1);
        this.trackable.drawables.removeCamDrawable(this);
    }

    addToCam() {
        allVisibleDrawables.push(this);
        this.trackable.drawables.addCamDrawable(this);
        for (var i = 0; i < this.onAddToCamAnimations.length; i++) {
            if (this.onAddToCamAnimations[i].repeating) {
                this.onAddToCamAnimations[i].animation.start(-1);
            } else {
                this.onAddToCamAnimations[i].animation.start();
            }
        }
    }

    onRecognitionAnimation() {
        for (var i = 0; i < this.onRecognitionAnimations.length; i++) {
            if (this.onRecognitionAnimations[i].repeating) {
                this.onRecognitionAnimations[i].animation.start(-1);
            } else {
                this.onRecognitionAnimations[i].animation.start();
            }
        }
    }
    onClickAdditions() {


    }
    onLostAnimation() {

    }

    onClickAnimation() {
        for (var i = 0; i < this.onClickAnimations.length; i++) {
            if (this.onClickAnimations[i].repeating) {
                this.onClickAnimations[i].animation.start(-1);
            } else {
                this.onClickAnimations[i].animation.start();
            }
        }
    }

    myOnDragBegan(x,y){
        return true;
    }
    myOnDragChanged(x,y){
        return true;
    }
    myOnDragEnded(x,y){
        return true;
    }
    myOnRotationBegan(angleInDegrees){
        return true;
    }
    myOnRotationChanged(angleInDegrees){
        return true;
    }
    myOnRotationEnded(angleInDegrees){
        return true;
    }
    myOnScaleBegan(scale){
        return true;
    }
    myOnScaleChanged(scale){
        return true;
    }
    myOnScaleEnded(scale){
        return true;
    }

}

class RTVideo extends AR.VideoDrawable {
    constructor(path, scaleFactor, optionsJSON, replayDrawable = null, repeating = true,trackablename) {
        var values = {
            translate: optionsJSON.translate,
            rotate: optionsJSON.rotate,
            scale: optionsJSON.scale,
            onDragBegan: function (x, y) {
                this.myOnDragBegan(x,y);
                return true;
            },
            onDragChanged: function (x, y) {
                this.myOnDragChanged(x,y);
                return true;
            },
            onDragEnded: function (x, y) {
                this.myOnDragEnded(x,y);
                return true;
            },
            onRotationBegan: function (angleInDegrees) {
                this.myOnRotationBegan(angleInDegrees);
                return true;
            },
            onRotationChanged: function (angleInDegrees) {
                this.myOnRotationChanged(angleInDegrees);
                return true;
            },
            onRotationEnded: function (angleInDegrees) {
                this.myOnRotationEnded(angleInDegrees);
                return true;
            },
            onScaleBegan: function (scale) {
                this.myOnScaleBegan(scale);
                return true;
            },
            onScaleChanged: function (scale) {
                this.myOnScaleChanged(scale);
                return true;
            },
            onScaleEnded: function (scale) {
                this.myOnScaleEnded(scale);
                return true;
            }
        };

        super(path, scaleFactor, values);
        var dirs = path.split("/");
        var nameParts = dirs[dirs.length - 1].split(".mp4");
        this.name = nameParts[0];
        allDrawables.push(this);
        if (repeating) {
            this.play(-1);
        } else {
            this.play();
        }
        this.pause();
        this.visible = false;
        this.onClickAnimations = [];
        this.onRecognitionAnimations = [];
        this.onAddToCamAnimations = [];
        this.onRemoveFromCamAnimations = [];
        this.previousDragValueX = optionsJSON.translate.x;
        this.previousDragValueY = optionsJSON.translate.y;
        this.previousDragValueZ = optionsJSON.translate.z;
        this.previousRotationValueX = optionsJSON.rotate.x;
        this.previousRotationValueY = optionsJSON.rotate.y;
        this.previousRotationValueZ = optionsJSON.rotate.z;
        this.previousScaleValue = optionsJSON.scale.x;
        this.oneFingerGestureAllowed = false;
        this.positioningEnabled = true;
        this.scalingEnabled = true;
        this.rotatingEnabled = false;
        this.rotateAxisX = false;
        this.rotateAxisY = false;
        this.rotateAxisZ = true;
        this.positioningAxisX = true;
        this.positioningAxisY = true;
        this.positioningAxisZ = false;
        if (replayDrawable != null) {
            replayDrawable.playVideoOnClick = this;
            this.onFinishedPlaying = function () {
                replayDrawable.addToCam();
            }
        }
        this.onClick = function () {
            this.onClickAnimation();
            this.onClickAdditions();
        }
        this.trackable = trackablename;
    }

    onImageRecognized(targetName) {
        //if (trackableBasis.drawables.cam.indexOf(this) > -1) {
        this.resume();
        //}
        this.onRecognitionAnimation();
    }

    onImageLost(targetName) {
        this.pause();
        this.onLostAnimation();
    }
    onClickAdditions() {

    }
    removeFromCam() {
        this.pause();
        for (var i = 0; i < this.onRemoveFromCamAnimations.length; i++) {
            if (this.onRemoveFromCamAnimations[i].repeating) {
                this.onRemoveFromCamAnimations[i].animation.start(-1);
            } else {
                this.onRemoveFromCamAnimations[i].animation.start();
            }
        }
        allVisibleDrawables.splice(allVisibleDrawables.indexOf(this),1);
        this.trackable.drawables.removeCamDrawable(this);
    }

    addToCam() {
        allVisibleDrawables.push(this);
        this.resume();
        this.trackable.drawables.addCamDrawable(this);
        for (var i = 0; i < this.onAddToCamAnimations.length; i++) {
            if (this.onAddToCamAnimations[i].repeating) {
                this.onAddToCamAnimations[i].animation.start(-1);
            } else {
                this.onAddToCamAnimations[i].animation.start();
            }
        }
    }

    onRecognitionAnimation() {
        for (var i = 0; i < this.onRecognitionAnimations.length; i++) {
            if (this.onRecognitionAnimations[i].repeating) {
                this.onRecognitionAnimations[i].animation.start(-1);
            } else {
                this.onRecognitionAnimations[i].animation.start();
            }
        }
    }

    onLostAnimation() {
    }

    onClickAnimation() {
        for (var i = 0; i < this.onClickAnimations.length; i++) {
            if (this.onClickAnimations[i].repeating) {
                this.onClickAnimations[i].animation.start(-1);
            } else {
                this.onClickAnimations[i].animation.start();
            }
        }
    }

    myOnDragBegan(x,y){
        return true;
    }
    myOnDragChanged(x,y){
        return true;
    }
    myOnDragEnded(x,y){
        return true;
    }
    myOnRotationBegan(angleInDegrees){
        return true;
    }
    myOnRotationChanged(angleInDegrees){
        return true;
    }
    myOnRotationEnded(angleInDegrees){
        return true;
    }
    myOnScaleBegan(scale){
        return true;
    }
    myOnScaleChanged(scale){
        return true;
    }
    myOnScaleEnded(scale){
        return true;
    }
}


function createAppLink(drawable, url) {
    drawable.onClickAdditions = function () {
        if (isAndroid()) {
				document.location = "architectsdk://url_https://www." + url;
        } else {
				window.location.href = "https://" + url;
        }
    }
}


function createWebLink(drawable, url) {
    drawable.onClickAdditions = function () {
        document.location = "architectsdk://url_" + url;
    }
}

function createSwapBuild(drawable, buildID, isPrivate, password) {
    if (isPrivate) {
        drawable.onClickAdditions = function () {
            document.location = "architectsdk://swapToPrivate_" + buildID + "_" + password;
        }
    } else {
        drawable.onClickAdditions = function () {
            document.location = "architectsdk://swapTo_" + buildID;
        }

    }
}

function createFullscreen(drawable, offlinevideopath) {
    drawable.onClickAdditions = function () {
        document.location = "architectsdk://fullscreen_" + offlinevideopath;
    }
}

function createPanoImage(drawable, offlinepanopath, onlinepanopath) {
    drawable.onClickAdditions = function () {
        if (isAndroid()) {
            document.location = "architectsdk://PanoImage_" + offlinepanopath;
        } else {
            document.location = "architectsdk://url_http://apps.neulandserver.de/onlineAssets/" + onlinepanopath;
        }
    }
}


function create3DBounceAnim(drawable, length) {

    var sx = new AR.PropertyAnimation(drawable, "scale.x", 0, drawable.scale.x, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
    });
    var sy = new AR.PropertyAnimation(drawable, "scale.y", 0, drawable.scale.y, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
    });
    var sz = new AR.PropertyAnimation(drawable, "scale.z", 0, drawable.scale.z, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
    });

    return new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL, [sx, sy, sz]);
}

function create3DBounceOutAnim(drawable, length) {

    var sx = new AR.PropertyAnimation(drawable, "scale.x", drawable.scale.x, 0, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_ELASTIC
    });
    var sy = new AR.PropertyAnimation(drawable, "scale.y", drawable.scale.y, 0, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_ELASTIC
    });
    var sz = new AR.PropertyAnimation(drawable, "scale.z", drawable.scale.z, 0, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_ELASTIC
    });

    return new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL, [sx, sy, sz]);
}

function create2DBounceAnim(drawable, length) {

    var sx = new AR.PropertyAnimation(drawable, "height", 0.75, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
    });

    return sx;
}

function create2DEaseInOutAnim(drawable, length,startingPoint) {

    var sx = new AR.PropertyAnimation(drawable, "height", startingPoint, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_CIRC,
        overshoot: 1.0
    });

    return sx;
}

function createOpacityUpAnim(drawable,length){
    return new AR.PropertyAnimation(drawable, "opacity", 0, 1, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_CUBIC
    });
}

function createOpacityDownAnim(drawable,length){
    return new AR.PropertyAnimation(drawable, "opacity", 1, 0, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_CUBIC
    }, {
		onFinish: function (drawable) {
			//drawable.removeFromCam();
			//drawable.opacity = 1;
		}
	});
}




// Linear
function create2DLinearAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.LINEAR
    });

    return sx;
}


// Quad
function create2DEaseInQuadAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_QUAD
    });

    return sx;
}

function create2DEaseOutQuadAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_QUAD
    });

    return sx;
}

function create2DEaseInOutQuadAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUAD
    });

    return sx;
}

function create2DEaseOutInQuadAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_QUAD
    });

    return sx;
}

// Cubic
function create2DEaseInCubicAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_CUBIC
    });

    return sx;
}

function create2DEaseOutCubicAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_CUBIC
    });

    return sx;
}

function create2DEaseInOutCubicAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_CUBIC
    });

    return sx;
}


function create2DEaseOutInCubicAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_CUBIC
    });

    return sx;
}

//Quat
function create2DEaseInQuatAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_QUAT
    });

    return sx;
}

function create2DEaseOutQuatAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_QUAT
    });

    return sx;
}

function create2DEaseInOutQuatAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUAT
    });

    return sx;
}

function create2DEaseOutInQuatAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_QUAT
    });

    return sx;
}

//Quint
function create2DEaseInQuintAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_QUINT
    });

    return sx;
}

function create2DEaseOutQuintAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_QUINT
    });

    return sx;
}

function create2DEaseInOutQuintAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUINT
    });

    return sx;
}

function create2DEaseOutInQuintAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_QUINT
    });

    return sx;
}

//Elastic
function create2DEaseInElasticAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_ELASTIC
    });

    return sx;
}

function create2DEaseOutElasticAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
    });

    return sx;
}

function create2DEaseInOutElasticAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_ELASTIC
    });

    return sx;
}

function create2DEaseOutInElasticAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_ELASTIC
    });

    return sx;
}

//Back
function create2DEaseInBackAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_BACK
    });

    return sx;
}

function create2DEaseOutBackAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_BACK
    });

    return sx;
}

function create2DEaseInOutBackAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_BACK
    });

    return sx;
}

function create2DEaseOutInBackAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_BACK
    });

    return sx;
}

//Sine
function create2DEaseInSineAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_SINE
    });

    return sx;
}

function create2DEaseOutSineAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_SINE
    });

    return sx;
}

function create2DEaseInOutSineAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_SINE
    });

    return sx;
}

function create2DEaseOutInSineAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_SINE
    });

    return sx;
}

//Expo
function create2DEaseInExpoAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_EXPO
    });

    return sx;
}

function create2DEaseOutExpoAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_EXPO
    });

    return sx;
}

function create2DEaseInOutExpoAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_EXPO
    });

    return sx;
}

function create2DEaseOutInExpoAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_EXPO
    });

    return sx;
}

//Circ
function create2DEaseInCircAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_CIRC
    });

    return sx;
}

function create2DEaseOutCircAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_CIRC
    });

    return sx;
}

function create2DEaseInOutCircAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_CIRC
    });

    return sx;
}

function create2DEaseOutInCircAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_CIRC
    });

    return sx;
}

//Bounce
function create2DEaseInBounceAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_BOUNCE
    });

    return sx;
}

function create2DEaseOutBounceAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_BOUNCE
    });

    return sx;
}

function create2DEaseInOutBounceAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_BOUNCE
    });

    return sx;
}

function create2DEaseOutInBounceAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_BOUNCE
    });

    return sx;
}

//Curve
function create2DEaseInCurveAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_IN_CURVE
    });

    return sx;
}

function create2DEaseOutCurveAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_CURVE
    });

    return sx;
}

function create2DEaseSinCurveAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_SIN_CURVE
    });

    return sx;
}

function create2DEaseCosCurveAnim(drawable, length, start){
    var sx = new AR.PropertyAnimation(drawable, "height", start, drawable.height, length, {
        type: AR.CONST.EASING_CURVE_TYPE.EASE_COS_CURVE
    });

    return sx;
}



function createMoveToPositionAnim(drawable,length,translationX,translationY,translationZ){
		var destributeAnimationx = new AR.PropertyAnimation(drawable, "translate.x", drawable.translate.x, translationX, length, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			});
		var destributeAnimationy = new AR.PropertyAnimation(drawable, "translate.y", drawable.translate.y, translationY, length, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			});
		var destributeAnimationz = new AR.PropertyAnimation(drawable, "translate.z", drawable.translate.z, translationZ, length, {
				type: AR.CONST.EASING_CURVE_TYPE.LINEAR
			});

		return new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL, [destributeAnimationx, destributeAnimationy, destributeAnimationz]);
}


/*
function createSequentialAppearAnim (drawables, length) {

    var drawableVar = [];

    for (var i = 0; i < drawables.length; i++) {
        var drawableVar[i] = new AR.PropertyAnimation(drawables[i], "height", 0, drawables[i].height, length);
    }

    //var drawable11 = new AR.PropertyAnimation(drawables[i], "height", 0, drawables[i].height, length);
    //var drawable22 = new AR.PropertyAnimation(drawables[1], "height", 0, drawables[1].height, length);

    return new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.SEQUENTIAL, [drawableVar[0], drawableVar[1]]);
}
*/

function createToggle(drawableOn, drawableOff, attachedDrawablesOn, attachedDrawablesOff, initialOn) {
    drawableOn.inverseDrawable = drawableOff;
    drawableOn.attachedDrawables = attachedDrawablesOn;
    drawableOff.inverseDrawable = drawableOn;
    drawableOff.attachedDrawables = attachedDrawablesOff;
    drawableOn.toggleTrue = initialOn;
    drawableOff.toggleTrue = !initialOn;
    if (initialOn) {
        if (attachedDrawablesOn.length > 0) {
            attachedDrawablesOn.addToCam();
        }
        if (attachedDrawablesOn.length > 0) {
            for (var i = 0; i < attachedDrawablesOn.length; i++) {
                if (attachedDrawablesOn[i].trackable.drawables.cam.indexOf(attachedDrawablesOn[i]) === -1) {
                    attachedDrawablesOn[i].addToCam();
                }
            }
        }
        drawableOn.addToCam();
    } else {
        if (attachedDrawablesOff.length > 0) {
            for (var i = 0; i < attachedDrawablesOff.length; i++) {
                if (attachedDrawablesOff[i].trackable.drawables.cam.indexOf(attachedDrawablesOff[i]) === -1) {
                    attachedDrawablesOff[i].addToCam();
                }
            }
        }
        drawableOff.addToCam();
    }

    drawableOn.onClickAdditions = function () {
        if (this.toggleTrue) {
            this.toggleTrue = false;
            this.inverseDrawable.toggleTrue = true;
            if (this.attachedDrawables.length > 0) {
                for (var i = 0; i < this.attachedDrawables.length; i++) {
                    this.attachedDrawables[i].removeFromCam();
                }
            }
            if (this.inverseDrawable.attachedDrawables.length > 0) {
                for (var i = 0; i < this.inverseDrawable.attachedDrawables.length; i++) {
                    if (this.inverseDrawable.attachedDrawables[i].trackable.drawables.cam.indexOf(this.inverseDrawable.attachedDrawables[i]) === -1) {
                        this.inverseDrawable.attachedDrawables[i].addToCam();
                    }

                }
            }

            this.removeFromCam();
            this.inverseDrawable.addToCam();
        }
    };

    drawableOff.onClickAdditions = function () {
        if (this.toggleTrue) {
            this.toggleTrue = false;
            this.inverseDrawable.toggleTrue = true;
            if (this.attachedDrawables.length > 0) {
                for (var i = 0; i < this.attachedDrawables.length; i++) {
                    this.attachedDrawables[i].removeFromCam();
                }
            }
            if (this.inverseDrawable.attachedDrawables.length > 0) {
                for (var i = 0; i < this.inverseDrawable.attachedDrawables.length; i++) {
                    if (this.inverseDrawable.attachedDrawables[i].trackable.drawables.cam.indexOf(this.inverseDrawable.attachedDrawables[i]) === -1) {
                        this.inverseDrawable.attachedDrawables[i].addToCam();
                    }
                }
            }
            this.removeFromCam();
            this.inverseDrawable.addToCam();
        }
    }
}

function isAndroid() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
        return true;
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return false;
    }
    return true;
}

function callAppInterface() {
    document.location = "architectsdk://barcode_123"
}

function writeOptionsToJSON() {
    var allOptions = "{\"data\":[";
    for (var i = 0; i < allDrawables.length; i++) {
        if (allOptions.length>10){
            allOptions += ",";
        }
        allOptions += "{\"name\":"+JSON.stringify(allDrawables[i].name)+"," +
            "\"scale\":"+JSON.stringify(allDrawables[i].scale)+"," +
            "\"translate\":"+JSON.stringify(allDrawables[i].translate)+"," +
            "\"rotate\":"+JSON.stringify(allDrawables[i].rotate)+"}";
    }
    allOptions+="]}";

    var json = JSON.stringify(allOptions);
    alert(json);
    AR.platform.sendJSONObject(JSON.parse(allOptions));
}

function makeEditable(drawable) {
    drawable.myOnDragBegan= function (x, y) {
        this.oneFingerGestureAllowed = true;
        return true;
    };
    drawable.myOnDragChanged= function (x, y) {
        if (this.oneFingerGestureAllowed && this.positioningEnabled) {
            if (this.positioningAxisX && this.positioningAxisY) {
                this.translate.x = this.previousDragValueX + x;
                this.translate.y = this.previousDragValueY - y;
            } else if (this.positioningAxisX && this.positioningAxisZ) {
                this.translate.x = this.previousDragValueX + x;
                this.translate.z = this.previousDragValueZ + y;
            }
            else if (this.positioningAxisY && this.positioningAxisZ) {
                this.translate.y = this.previousDragValueY - x;
                this.translate.z = this.previousDragValueZ + y;
            }
        }

        return true;
    };
    drawable.myOnDragEnded= function (x, y) {
        this.previousDragValueX = this.translate.x;
        this.previousDragValueY = this.translate.y;
        this.previousDragValueZ = this.translate.z;

        return true;
    };
    drawable.myOnRotationBegan= function (angleInDegrees) {
        return true;
    };
    drawable.myOnRotationChanged= function (angleInDegrees) {
        if (this.rotatingEnabled) {
            if (this.rotateAxisX) {
                this.rotate.x = this.previousRotationValueX - angleInDegrees;
            } else if (this.rotateAxisY) {
                this.rotate.y = this.previousRotationValueY - angleInDegrees;
            } else if (this.rotateAxisZ) {
                this.rotate.z = this.previousRotationValueZ - angleInDegrees;
            }
        }
        return true;
    };
    drawable.myOnRotationEnded= function (angleInDegrees) {
        this.previousRotationValueX = this.rotate.x;
        this.previousRotationValueY = this.rotate.y;
        this.previousRotationValueZ = this.rotate.z;

        return true;
    };
    drawable.myOnScaleBegan= function (scale) {
        return true;
    };
    drawable.myOnScaleChanged= function (scale) {
        if (this.scalingEnabled) {
            var scaleValue = this.previousScaleValue * scale;
            this.scale = {x: scaleValue, y: scaleValue, z: scaleValue};
        }
        return true;
    };
    drawable.myOnScaleEnded= function (scale) {
        this.previousScaleValue = this.scale.x;

        return true;
    }
}
